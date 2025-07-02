import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createInvoice , getInvoiceInfo } from "../controllers/invoice.controller.js";

const router = express.Router();

// POST /invoices - Create a new invoice (requires login)
router.post("/", protectRoute, createInvoice);
router.get("/", protectRoute, getInvoiceInfo);

export default router;
