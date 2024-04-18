import { Router } from "express";
import * as ctrlReports from "../controllers/sales.controller"
import { authjwt, authLimiter, verifyFieldsSales } from "../middlewares";

const router = Router();

router.get("/",[authjwt.verifyToken,
                verifyFieldsSales.verifyFields, 
                authLimiter.getsLimit], ctrlReports.getReports);


export default router;