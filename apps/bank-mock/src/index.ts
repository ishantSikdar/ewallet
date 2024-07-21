import express from 'express';
import ewalletReqRouter from './route/tokenRoute';
import { ROUTE_TOKEN } from '@repo/common/route';
import cors from 'cors';

require('dotenv').config();
require('dotenv').config({ path: `../../.env` });

console.log("Loaded environment variables");

const PORT: number = Number(process.env.PORT);

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.BANK_INTERFACE_BASE_URL
}));

app.use(ROUTE_TOKEN, ewalletReqRouter);

app.listen(8081, () => {
    console.log("Bank Mock listening to PORT:", PORT);
});