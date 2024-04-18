import { Router } from "express";

const router = Router();
import * as authCtrl from "../controllers/auth.controller"

import { verifySignup, authLimiter } from "../middlewares";


router.post("/signin", [verifySignup.validateFieldsLogin, authLimiter.Login], authCtrl.signIn);

router.post("/signup", [ verifySignup.validateFields,    
                        authLimiter.amountLimit,
                        verifySignup.checkDuplicateEmail, 
                        verifySignup.checkDuplicatePhone,
                        verifySignup.verifyExistedRole,
                      ], authCtrl.signUp);

export default router;