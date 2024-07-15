'use server'

import { authOptions } from "../auth/auth";
import prisma from "@repo/db/client";
import axios from "axios";
import { BANK_MOCK_BASE, ROUTE_TOKEN, SUB_ROUTE_GENERATE } from "@repo/common/route";
import { getUserServerSession } from "./session";
import { TokenType } from "../interfaces/TransactionBriefType";


export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getUserServerSession();

    const newTokenResponse = await axios.post<TokenType>(`${BANK_MOCK_BASE}${ROUTE_TOKEN}${SUB_ROUTE_GENERATE}`);
    const newToken = newTokenResponse.data.token;

    const transaction = await prisma.onRampTransaction.create({
        data: {
            amount: amount * 100,
            provider: provider,
            status: 'Pending',
            timestamp: new Date(),
            token: newToken,
            userId: Number(session?.user.id),
        },
    });

    return {
        transactionId: transaction.id,
        message: "Done"
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
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        })
    }));


    return formattedTransactions;
}