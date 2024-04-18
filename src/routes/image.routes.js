import express from "express";
import { google } from "googleapis";
import * as ctrlImage from "../controllers/uploadImg";
import { Router } from "express";
import { authLimiter, authjwt } from "../middlewares";


const router = Router();

router.get("/", ctrlImage.getPrueba);

router.post("/post",[
                     authLimiter.patchLimit,
                     ], ctrlImage.postImage);

export default router;


