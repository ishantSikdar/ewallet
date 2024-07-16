import { Router } from "express";
import { ewalletRequestSuccess, generateToken } from "../controller/eWalletReqController";
import { SUB_ROUTE_GENERATE, SUB_ROUTE_TRANSACTION_SUCCESS } from "@repo/common/route";

const ewalletReqRouter = Router();

ewalletReqRouter.post(SUB_ROUTE_GENERATE, generateToken);
ewalletReqRouter.post(SUB_ROUTE_TRANSACTION_SUCCESS, ewalletRequestSuccess)

export default ewalletReqRouter;