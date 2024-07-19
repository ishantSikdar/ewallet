import express, { Request, Response } from 'express';
import ewalletReqRouter from './route/tokenRoute';
import { BANK_INTERFACE_BASE, ROUTE_TOKEN } from '@repo/common/route';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    origin: BANK_INTERFACE_BASE
}))

app.use(ROUTE_TOKEN, ewalletReqRouter);

app.get("/test", (req: Request, res: Response) => {
    const endUser = process.env.END_USER_BASE_URL;
    const bankMock = process.env.BANK_MOCK_BASE_URL;
    const bankInterface = process.env.BANK_INTERFACE_BASE_URL;
    const bankWebhook = process.env.BANK_WEBHOOK_BASE_URL;

    res.json({
        endUser,
        bankInterface,
        bankMock,
        bankWebhook
    });
})

app.listen(8081, () => {
    console.log("Listening to PORT", 8081);
});