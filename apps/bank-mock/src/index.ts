import express from 'express';
import tokenRouter from './route/tokenRoute';
import { ROUTE_TOKEN } from '@repo/common/route';

const app = express();

app.use(ROUTE_TOKEN, tokenRouter);

app.listen(8081, () => {
    console.log("Listening to PORT", 8081);
});