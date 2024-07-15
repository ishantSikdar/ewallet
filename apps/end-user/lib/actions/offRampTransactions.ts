import prisma from "@repo/db/client";
import { getUserServerSession } from "./session";

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