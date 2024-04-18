import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { authjwt, verifySignup, userExist, authLimiter } from "../middlewares";

const router = Router();

router.get("/", [authjwt.verifyToken,
                 authLimiter.getsLimit,
                 authjwt.isAdmin,
               ], userCtrl.getUsers);  


router.post("/", [ authjwt.verifyToken,
                    authLimiter.postLimits,
                     verifySignup.validateFields,
                     verifySignup.checkDuplicateEmail,
                     verifySignup.checkDuplicatePhone,
                    verifySignup.verifyExistedRole,
                    authjwt.isAdmin], userCtrl.createUser);



router.delete("/:userId",[authjwt.verifyToken, 
                         authLimiter.amountLimit,
                         authjwt.isAdmin], userCtrl.deleteUser);

router.patch("/:userId", [authjwt.verifyToken, userExist,  authLimiter.changePassword], userCtrl.changePassword);


export default router;
