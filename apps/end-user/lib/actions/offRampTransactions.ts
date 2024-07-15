'use server'

import prisma from "@repo/db/client";
import { getUserServerSession } from "./session";
import axios from "axios";
import { TokenType } from "../interfaces/TransactionBriefType";
import { BANK_MOCK_BASE, ROUTE_TOKEN, SUB_ROUTE_GENERATE } from "@repo/common/route";

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
            weekday: 'short',
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

    const newTokenResponse = await axios.post<TokenType>(`${BANK_MOCK_BASE}${ROUTE_TOKEN}${SUB_ROUTE_GENERATE}`);
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

        if (currbalance || 0 >= amount) {
            return await tx.offRampTransaction.create({
                data: {
                    amount: amount * 100,
                    provider: provider,
                    status: "Pending",
                    token: newToken,
                    userId: Number(session?.user.id),
                }
            });
        }
    });

    return {
        transactionId: offRampTransaction?.id,
        message: "Done"
    }
}

