import { Router } from "express";
import * as ordersCtrl from "../controllers/orders.controller"
import { ordersValidate, authjwt, authLimiter } from "../middlewares"


const router = Router();

 router.get('/', [authjwt.verifyToken,
                 authLimiter.getsLimit,
                 authjwt.isAdmin
                 ], ordersCtrl.getOrders);
               

  router.patch('/',  [authjwt.verifyToken,
                      authLimiter.patchLimit,
                      ordersValidate.verifyStatusAndIds,
                      authjwt.isAdmin],  ordersCtrl.changeStatusOrders);


router.post("/",[authLimiter.postLimits,
                ordersValidate.verifyFields], ordersCtrl.createOrders);

                


export default router;