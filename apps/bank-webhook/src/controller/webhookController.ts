import { UpdateUserBalanceRequestType } from "@repo/common/interface";
import prisma from "@repo/db/client";
import { Request, Response } from "express";

export const withdrawUserBalance = async (req: Request, res: Response) => {
    // zod and request validation (using secrets)

    const paymentInfo: UpdateUserBalanceRequestType = {
        token: req.body.token,
        userId: Number(req.body.userId),
        amount: Number(req.body.amount),
    }

    console.log("withdraw payment info:", paymentInfo);

    try {
        await prisma.$transaction(async (tx) => {
            const balanceLockQuery = `SELECT * FROM "Balance" WHERE "userId"='${paymentInfo.userId}'`;
            const onRampTransLockQuery = `SELECT * FROM "OnRampTransaction" WHERE "token"='${paymentInfo.token}'`;

            await tx.$executeRawUnsafe(balanceLockQuery);
            await tx.$executeRawUnsafe(onRampTransLockQuery);

            const pendingOnRampTransaction = await tx.onRampTransaction.findFirst({
                where: {
                    token: paymentInfo.token,
                },
            });

            if (pendingOnRampTransaction?.status !== 'Pending') {
                throw new Error("Transaction is already completed");
            }

            const latestBalance = await tx.balance.findFirst({
                where: { userId: paymentInfo.userId },
                orderBy: { timestamp: 'desc' }
            });

            const newBalanceAmt = paymentInfo.amount + (latestBalance?.totalBalance || 0);

            const newBalance = await tx.balance.create({
                data: {
                    userId: paymentInfo.userId,
                    totalBalance: newBalanceAmt,
                    transactionAmt: paymentInfo.amount,
                    locked: latestBalance?.locked || 0,
                }
            });

            await tx.onRampTransaction.update({
                where: {
                    token: paymentInfo.token
                },
                data: {
                    status: 'Success'
                },
            });
        });

        console.log("Captured Withdraw Request");
        res.status(200).json({ message: "Captured" });

    } catch (error) {
        console.error(`Unable to process withdrawl request`, error);
        res.status(500).json({
            message: "Failed to withdraw"
        });
    }
}


export const depositUserBalance = async (req: Request, res: Response) => {
    // zod and request validation (using secrets)

    const paymentInfo: UpdateUserBalanceRequestType = {
        token: req.body.token,
        userId: Number(req.body.userId),
        amount: Number(req.body.amount),
    }
    console.log("deposit payment info:", paymentInfo);

    try {
        await prisma.$transaction(async (tx) => {
            const balanceLockQuery = `SELECT * FROM "Balance" WHERE "userId"='${paymentInfo.userId}'`;
            const offRampTransLockQuery = `SELECT * FROM "OffRampTransaction" WHERE "token"='${paymentInfo.token}'`;

            await tx.$executeRawUnsafe(balanceLockQuery);
            await tx.$executeRawUnsafe(offRampTransLockQuery);

            const pendingOffRampTransaction = await tx.offRampTransaction.findFirst({
                where: {
                    token: paymentInfo.token,
                },
            });

            if (pendingOffRampTransaction?.status !== 'Pending') {
                throw new Error("Transaction is already completed");
            }

            const latestBalance = await tx.balance.findFirst({
                where: { userId: paymentInfo.userId },
                orderBy: { timestamp: 'desc' }
            });

            if ((latestBalance?.totalBalance || 0) < paymentInfo.amount) {
                throw new Error('Insufficient Balance');
            }

            const newBalanceAmt = (latestBalance?.totalBalance || 0) - paymentInfo.amount;

            const newBalance = await tx.balance.create({
                data: {
                    userId: paymentInfo.userId,
                    totalBalance: newBalanceAmt,
                    transactionAmt: -paymentInfo.amount,
                    locked: latestBalance?.locked || 0,
                }
            });

            await tx.offRampTransaction.update({
                where: {
                    token: paymentInfo.token
                },
                data: {
                    status: 'Success'
                },
            });
        });

        console.log("Captured Deposit Request");
        res.status(200).json({ message: "Captured" });


    } catch (error) {
        console.error(`Unable to process deposit request`, error);
        res.status(500).json({
            message: "Failed to deposit"
        });
    }
}