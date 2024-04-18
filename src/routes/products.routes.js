import { Router } from "express";
import * as ProductsCtrl from "../controllers/products.controller";
import { authjwt, duplicateP, authLimiter } from "../middlewares";

const router = Router();

router.get("/", authLimiter.getsLimit, ProductsCtrl.getProducts);
router.get("/:productId", authLimiter.getsLimit, ProductsCtrl.getProductById);

router.post("/", [
    authjwt.verifyToken,
    authLimiter.postLimits,
    authjwt.isAdmin,
    duplicateP.validateFields,
    duplicateP.verifyDuplicate
], ProductsCtrl.createProduct);

router.put("/:productId", [
    authjwt.verifyToken,
    authLimiter.putLimits,
    authjwt.isAdmin,
    duplicateP.validateFields
], ProductsCtrl.updateProductById);

router.delete("/:productId", [
    authjwt.verifyToken,
    authLimiter.deleteLimits,
    authjwt.isAdmin
], ProductsCtrl.deleteProductById);

router.patch("/:productId", [
    authjwt.verifyToken,
    authLimiter.patchLimit,
    authjwt.isAdmin
], ProductsCtrl.patchAmountProduct);

export default router;
 