'use server'

import prisma from "@repo/db/client";
import axios from "axios";
import { ROUTE_TOKEN, SUB_ROUTE_GENERATE } from "@repo/common/route";
import { getUserServerSession } from "./session";
import { TokenType } from "../interfaces/common";


export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getUserServerSession();

    try {
        const newTokenResponse = await axios.post<TokenType>(`${process.env.BANK_MOCK_BASE_URL}${ROUTE_TOKEN}${SUB_ROUTE_GENERATE}`, 
        JSON.stringify({
            amount: amount * 100,
            userId: Number(session?.user.id),
            isDeposit: false,
        }), {
            headers: { "Content-Type": "application/json" }
        });

        const newToken = newTokenResponse.data.token;
        const transaction = await prisma.onRampTransaction.create({
            data: {
                amount: amount * 100,
                provider: provider,
                status: newTokenResponse.status === 200 ? 'Pending' : 'Failure',
                token: newToken,
                userId: Number(session?.user.id),
            },
        });

        return {
            url: newTokenResponse.data.url,
            transactionId: transaction.id,
            message: "Done"
        };
    } catch (error: any) {
        console.error("Error creating on-ramp transaction:", error);

        if (error.code === 'ECONNREFUSED') {
            // Handle connection refused error specifically
            const transaction = await prisma.onRampTransaction.create({
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
                transactionId: transaction.id,
                message: "Failed to connect to the bank service"
            };
        }

        // Handle other possible errors
        throw error;
    }
}

export async function getRecentOnRampTransactions() {
    const session = await getUserServerSession();

    const recentTransactions = await prisma.onRampTransaction.findMany({
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
            year: '2-digit',
            timeZone: 'Asia/Kolkata'
        })
    }));


    return formattedTransactions;
}