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
        await prisma.$transaction(async (prisma) => {
            const latestBalance = await prisma.balance.findFirst({
                where: { userId: paymentInfo.userId },
                orderBy: { timestamp: 'desc' }
            });
            
            const newBalanceAmt = paymentInfo.amount + (latestBalance?.totalBalance || 0);

            const newBalance = await prisma.balance.create({
                data: {
                    userId: paymentInfo.userId,
                    totalBalance: newBalanceAmt,
                    transactionAmt: paymentInfo.amount,
                    locked: latestBalance?.locked || 0,
                }
            });

            await prisma.onRampTransaction.update({
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