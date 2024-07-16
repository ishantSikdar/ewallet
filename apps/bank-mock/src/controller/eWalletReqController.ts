import { BANK_INTERFACE_BASE, BANK_WEBHOOK_BASE, ROUTE_WEBHOOK, SUB_ROUTE_DEPOSIT, SUB_ROUTE_WITHDRAW } from '@repo/common/route';
import axios from 'axios';
import { Request, Response } from 'express';
import { v1 as uuidv1 } from 'uuid';

export const generateToken = (req: Request, res: Response) => {
    const paymentInfo = {
        amount: Number(req.body.amount),
        userId: Number(req.body.userId),
        isDeposit: req.body.isDeposit
    }
    const token = uuidv1();

    console.log("Token generated", {
        token,
        paymentInfo
    });
    
    res.status(200).json({
        token: token,
        url: `${BANK_INTERFACE_BASE}/transaction?f=${paymentInfo.amount}&sub=${paymentInfo.userId}&d=${paymentInfo.isDeposit}&token=${token}`,
    });
};


// for bank-interface
export const ewalletRequestSuccess = async (req: Request, res: Response) => {
    const transactionInfo = {
        token: req.body.token as string,
        userId: Number(req.body.userId),
        amount: Number(req.body.amount),
        isDeposit: req.body.isDeposit,
    }

    try {
        // update balance of user in their account
        // after updating user balance, send request to eWallet webhook
        const webhookResponse = await axios.post(
            `${BANK_WEBHOOK_BASE}${ROUTE_WEBHOOK}${transactionInfo.isDeposit ? SUB_ROUTE_DEPOSIT : SUB_ROUTE_WITHDRAW}`,
            JSON.stringify({
                token: transactionInfo.token,
                userId: transactionInfo.userId,
                amount: transactionInfo.amount,
            }), {
            headers: { "Content-Type": "application/json" }
        });

        if (webhookResponse.status !== 200) {
            throw new Error("Something went wrong");
        }

        console.log("User Balance Updated", transactionInfo);
        res.status(200).json({ message: "Captured" })

    } catch (error) {
        // in any error, rollback user balance changes
        console.error(error);
        res.status(500).json({ message: "Failed" });
    }
}