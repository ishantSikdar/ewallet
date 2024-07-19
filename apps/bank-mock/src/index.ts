import express from 'express';
import ewalletReqRouter from './route/tokenRoute';
import { BANK_INTERFACE_BASE, BANK_MOCK_BASE, ROUTE_TOKEN } from '@repo/common/route';
import cors from 'cors';

const PORT: number = Number(BANK_MOCK_BASE.slice(-4)) || 8081;

const app = express();
app.use(express.json());

app.use(cors({
    origin: BANK_INTERFACE_BASE
}))

app.use(ROUTE_TOKEN, ewalletReqRouter);

app.listen(8081, () => {
    console.log("Bank Mock listening to PORT:", PORT);
});