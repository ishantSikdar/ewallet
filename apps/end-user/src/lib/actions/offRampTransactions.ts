'use server'

import prisma from "@repo/db/client";
import { getUserServerSession } from "./session";
import axios from "axios";
import { TokenType } from "../interfaces/common";
import { ROUTE_TOKEN, SUB_ROUTE_GENERATE } from "@repo/common/route";

export async function getRecentOffRampTransactions() {
    const session = await getUserServerSession();

    const recentTransactions = await prisma.offRampTransaction.findMany({
        where: {
            userId: Number(session?.user.id),
        },
        orderBy: {
            timestamp: "desc"
        },
        select: {
            id: true,
            amount: true,
            status: true,
            provider: true,
            timestamp: true,
        }
    })

    const formattedTransactions = recentTransactions.map(transaction => ({
        ...transaction,
        timestamp: new Date(transaction.timestamp).toLocaleDateString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        })
    }));


    return formattedTransactions;
}
export async function createOffRampTransaction(amount: number, provider: string) {
    const session = await getUserServerSession();

    try {
        const newTokenResponse = await axios.post<TokenType>(`${process.env.BANK_MOCK_BASE_URL}${ROUTE_TOKEN}${SUB_ROUTE_GENERATE}`, 
        JSON.stringify({
            amount: amount * 100,
            userId: Number(session?.user.id),
            isDeposit: true,
        }), {
            headers: { "Content-Type": "application/json" }
        });
        const newToken = newTokenResponse.data.token;

        const offRampTransaction = await prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe(`SELECT * FROM "Balance" WHERE "userId"='${Number(session?.user.id)}' FOR UPDATE`);
            
            const latestUserBalance = await tx.balance.findFirst({
                where: {
                    userId: Number(session?.user.id)
                },
                orderBy: {
                    timestamp: 'desc'
                }
            });

            const currbalance = latestUserBalance?.totalBalance;

            if ((currbalance || 0) >= amount) {
                return await tx.offRampTransaction.create({
                    data: {
                        amount: amount * 100,
                        provider: provider,
                        status: newTokenResponse.status === 200 ? 'Pending' : 'Failure',
                        token: newToken,
                        userId: Number(session?.user.id),
                    }
                });
            } else {
                throw new Error('Insufficient balance');
            }
        });

        return {
            url: newTokenResponse.data.url,
            transactionId: offRampTransaction?.id,
            message: "Done"
        };
    } catch (error: any) {
        console.error("Error creating off-ramp transaction:", error);

        if (error.code === 'ECONNREFUSED') {
            // Handle connection refused error specifically
            const offRampTransaction = await prisma.offRampTransaction.create({
                data: {
                    amount: amount * 100,
                    provider: provider,
                    status: 'Failure',
                    token: null,
                    userId: Number(session?.user.id),
                },
            });

            return {
                url: null,
                transactionId: offRampTransaction.id,
                message: "Failed to connect to the bank service"
            };
        }

        // Handle other possible errors
        throw error;
    }
}