import { UpdateUserBalanceRequestType } from "@repo/common/interface";
import prisma from "@repo/db/client";
import { Request, Response } from "express";

export const updateUserBalance = async (req: Request, res: Response) => {
    // zod and request validation (using secrets)

    const paymentInfo: UpdateUserBalanceRequestType = {
        token: req.body.token,
        userId: Number(req.body.userId),
        amount: Number(req.body.amount),
    }

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

        res.status(200).json({ message: "Captured" });


    } catch (error) {
        console.error(`Unable to process hdfc webhook request`, error);
        res.status(500).json({
            message: "Failed to update user balance"
        });
    }
}