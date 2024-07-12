import { Router } from "express";
import { updateUserBalance } from "../controller/webhookController";
import { SUB_ROUTE_HDFC } from "@repo/common/route";

const webHookRouter = Router()

webHookRouter.post(SUB_ROUTE_HDFC, updateUserBalance)

export default webHookRouter;