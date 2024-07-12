import express from 'express';
import webHookRouter from './route/webhookRoute';
import { ROUTE_WEBHOOK } from '@repo/common/route';

const app = express();
app.use(express.json());

app.use(ROUTE_WEBHOOK, webHookRouter);

app.listen(8080, () => {
    console.log("Listening to PORT", 8080);
});