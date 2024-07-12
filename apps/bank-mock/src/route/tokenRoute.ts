import { Router } from "express";
import { generateToken } from "../controller/tokenController";
import { SUB_ROUTE_GENERATE } from "@repo/common/route";

const tokenRouter = Router();

tokenRouter.post(SUB_ROUTE_GENERATE, generateToken);

export default tokenRouter;