import express from 'express';
import webHookRouter from './route/webhookRoute';
import { ROUTE_WEBHOOK } from '@repo/common/route';
require('dotenv').config();

const PORT: number = Number(process.env.PORT);

const app = express();
app.use(express.json());

app.use(ROUTE_WEBHOOK, webHookRouter);

app.listen(8080, () => {
    console.log("Bank webhook listening to PORT:", PORT);
});