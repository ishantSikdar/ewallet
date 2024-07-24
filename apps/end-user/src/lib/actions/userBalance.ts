'use server'

import prisma from "@repo/db/client";
import { getUserServerSession } from "./session";

export async function getUserBalance() {
    const session = await getUserServerSession();

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
    const session = await getUserServerSession();

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
    const session = await getUserServerSession();
    const senderId = Number(session?.user.id);

    // start transaction
    await prisma.$transaction(async (tx) => {

        // search for receiver and get their data + balance
        const receiverUser = await tx.user.findFirst({
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
        const lockReceiverBalanceQuery = `SELECT * FROM "Balance" WHERE "userId"='${receiverUser?.id}' FOR UPDATE`;

        await tx.$executeRawUnsafe(lockSenderBalanceQuery, lockReceiverBalanceQuery);

        const senderUser = await tx.user.findFirst({
            where: { id: senderId },
            select: {
                Balance: {
                    orderBy: { timestamp: "desc" },
                    take: 1
                },
                Contacts: true
            }
        });

        const userCurrBalance = senderUser?.Balance[0];

        if (userCurrBalance) {
            // checking user balance
            if (userCurrBalance.totalBalance < amount) {
                throw new Error('Insufficent Funds');
            }

            const receiverBalance = receiverUser?.Balance[0];

            if (receiverBalance) {

                // increase receiver balance
                await tx.balance.create({
                    data: {
                        locked: receiverBalance.locked,
                        totalBalance: receiverBalance.totalBalance + amount,
                        userId: receiverUser.id,
                        transactionAmt: amount,
                    }
                });

                // decrease sender balance
                await tx.balance.create({
                    data: {
                        locked: userCurrBalance.locked,
                        totalBalance: userCurrBalance.totalBalance - amount,
                        userId: senderId,
                        transactionAmt: -amount,
                    },
                });

                await tx.p2PTransfer.create({
                    data: {
                        amount: amount,
                        fromUserId: senderId,
                        toUserId: receiverUser.id,
                    }
                });

                if (!senderUser.Contacts.find(contact => contact.contactId === receiverUser.id)) {
                    await tx.contact.create({
                        data: {
                            userId: senderId,
                            contactId: receiverUser.id,
                        }
                    });
                }
            }
        }
    });

    return {
        message: "Amount sent"
    }
}

export async function getP2PTransactions() {
    const session = await getUserServerSession();

    const userId = Number(session?.user.id);

    const p2pTransfers = await prisma.p2PTransfer.findMany({
        where: {
            OR: [
                { toUserId: userId },
                { fromUserId: userId }
            ]
        },
        orderBy: {
            timestamp: 'desc'
        },
        select: {
            id: true,
            amount: true,
            timestamp: true,
            FromUser: {
                select: {
                    id: true,
                    name: true,
                    number: true,
                    email: true,
                }
            },
            ToUser: {
                select: {
                    id: true,
                    name: true,
                    number: true,
                    email: true,
                }
            }
        }
    });

    return p2pTransfers.map((p) => {
        const userToShow = p.FromUser.id === userId ? {
            name: p.ToUser.name,
            number: p.ToUser.number,
            email: p.ToUser.email
        } : {
            name: p.FromUser.name,
            number: p.FromUser.number,
            email: p.FromUser.email
        };

        return {
            id: p.id,
            amount: p.amount,
            isReceiver: p.ToUser.id === userId,
            timestamp: new Date(p.timestamp).toLocaleDateString('en-IN', {
                hour: '2-digit',
                minute: "2-digit",
                month: 'short',
                day: 'numeric',
                year: '2-digit',
                timeZone: 'Asia/Kolkata'
            }),
            user: userToShow,
        }
    });
}

export async function getUsersAllP2PTransactions() {
    const session = await getUserServerSession();
    const userId = Number(session?.user.id);

    const p2pTransfers = await prisma.p2PTransfer.findMany({
        where: {
            OR: [
                { toUserId: userId },
                { fromUserId: userId }
            ],
        },
        orderBy: {
            timestamp: 'desc'
        },
        select: {
            id: true,
            amount: true,
            timestamp: true,
            FromUser: {
                select: {
                    id: true,
                    name: true,
                    number: true,
                    email: true,
                }
            },
            ToUser: {
                select: {
                    id: true,
                    name: true,
                    number: true,
                    email: true,
                }
            }
        }
    });

    return p2pTransfers.map((p) => {
        const userToShow = p.FromUser.id === userId ? {
            name: p.ToUser.name,
            number: p.ToUser.number,
            email: p.ToUser.email
        } : {
            name: p.FromUser.name,
            number: p.FromUser.number,
            email: p.FromUser.email
        };

        return {
            id: p.id,
            name: userToShow.name,
            email: userToShow.email,
            number: userToShow.number,
            amount: p.amount,
            isReceiver: p.ToUser.id === userId,
            timestamp: new Date(p.timestamp).toLocaleDateString('en-IN', {
                hour: '2-digit',
                minute: "2-digit",
                month: 'short',
                day: 'numeric',
                year: '2-digit',
                timeZone: 'Asia/Kolkata'
            }),
        }
    });
}