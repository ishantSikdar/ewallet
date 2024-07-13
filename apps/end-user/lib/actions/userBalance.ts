'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth";
import prisma from "@repo/db/client";
import { redirect } from "next/navigation";
import { ROUTE_SIGNIN } from "../../constants/routes";

export async function getUserBalance() {
    const session = await getServerSession(authOptions);

    const userBalance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user.id),
        },
        orderBy: {
            timestamp: "desc"
        },
        take: 1,
        select: {
            totalBalance: true,
            locked: true,
        }
    });

    return {
        amount: userBalance?.totalBalance || 0,
        locked: userBalance?.locked || 0,
    }
}

export async function getUserBalanceOvertime() {
    const session = await getServerSession(authOptions);

    return await prisma.balance.findMany({
        where: { userId: Number(session?.user.id) },
        orderBy: { timestamp: 'asc' },
        select: {
            transactionAmt: true,
            totalBalance: true,
            timestamp: true,
        }
    });
}

export async function sendMoneyToUser(number: string, amount: number) {
    const session = await getServerSession(authOptions);
    const senderId = Number(session?.user.id);

    if (!senderId) {
        redirect(ROUTE_SIGNIN);
    }

    // start transaction
    await prisma.$transaction(async (tx) => {

        // search for reciever and get their data + balance
        const recieverUser = await tx.user.findFirst({
            where: { number: number },
            select: {
                id: true,
                Balance: {
                    orderBy: { timestamp: "desc" },
                    take: 1
                }
            }
        });

        // lock all balance enteries for both users
        const lockSenderBalanceQuery = `SELECT * FROM "Balance" WHERE "userId"='${senderId}' FOR UPDATE`;
        const lockRecieverBalanceQuery = `SELECT * FROM "Balance" WHERE "userId"='${recieverUser?.id}' FOR UPDATE`;

        await tx.$executeRawUnsafe(lockSenderBalanceQuery, lockRecieverBalanceQuery);

        const senderUserBalance = await tx.user.findFirst({
            where: { id: senderId },
            select: {
                Balance: {
                    orderBy: { timestamp: "desc" },
                    take: 1
                }
            }
        });

        const userCurrBalance = senderUserBalance?.Balance[0];

        if (userCurrBalance) {
            // checking user balance
            if (userCurrBalance.totalBalance < amount) {
                throw new Error('Insufficent Funds');
            }

            const recieverBalance = recieverUser?.Balance[0];

            if (recieverBalance) {

                // increase receiver balance
                await tx.balance.create({
                    data: {
                        locked: recieverBalance.locked,
                        totalBalance: recieverBalance.totalBalance + amount,
                        userId: recieverUser.id,
                        transactionAmt: amount,
                    }
                });

                // decrease sender balance
                await tx.balance.create({
                    data: {
                        locked: userCurrBalance.locked,
                        totalBalance: userCurrBalance.totalBalance - amount,
                        userId: senderId,
                        transactionAmt: 0 - amount,
                    },
                });
            }
        }
    });

    return {
        message: "Amount sent"
    }
}