import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const newToken = "dhsjbc-csdsdv-svdsvs-vsdvsdv";
    
    await prisma.onRampTransaction.create({
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
        message: "Done"
    }
}

export async function getRecentOnRampTransactions() {
    const session = await getServerSession(authOptions);
    
    const recentTransactions = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user.id),
        },
        orderBy: {
            timestamp: "desc"
        }, 
        take: 15,
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