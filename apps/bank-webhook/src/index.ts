import prisma from '@repo/db/client';
import express from 'express';
const app = express();

app.post('/hdfcWebhook', async (req, res) => {
    // zod and request validation (using secrets)

    const paymentInfo = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
    }

    try {
        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: Number(paymentInfo.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount),
                    }
                },
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: paymentInfo.token
                },
                data: {
                    status: 'Success'
                },
            }),
        ]);

        res.status(200).json({
            message: "Captured"
        });


    } catch (error) {
        console.error(`Unable to process hdfc webhook request`, error);
        res.status(500).json({
            message: "webhook request failed"
        });
    }
})

app.listen(8080, () => {
    console.log("Listening to PORT", 8080);
});