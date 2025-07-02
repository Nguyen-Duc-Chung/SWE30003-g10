import express from "express";
import { createOrderInfo, getOrderInfo } from "../controllers/orderInfo.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getOrderInfo);
router.post("/", protectRoute, createOrderInfo);

export default router;