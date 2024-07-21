import express from 'express';
import webHookRouter from './route/webhookRoute';
import { BANK_WEBHOOK_PORT, ROUTE_WEBHOOK } from '@repo/common/route';

const PORT: number = Number(BANK_WEBHOOK_PORT);

const app = express();
app.use(express.json());

app.use(ROUTE_WEBHOOK, webHookRouter);

app.listen(8080, () => {
    console.log("Bank webhook listening to PORT:", PORT);
});