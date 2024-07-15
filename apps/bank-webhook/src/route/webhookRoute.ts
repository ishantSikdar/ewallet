import { Router } from "express";
import { depositUserBalance, withdrawUserBalance } from "../controller/webhookController";
import { SUB_ROUTE_DEPOSIT, SUB_ROUTE_WITHDRAW } from "@repo/common/route";

const webHookRouter = Router()

webHookRouter.post(SUB_ROUTE_WITHDRAW, withdrawUserBalance)
webHookRouter.post(SUB_ROUTE_DEPOSIT, depositUserBalance)

export default webHookRouter;