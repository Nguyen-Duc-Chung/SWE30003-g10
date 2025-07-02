import express from "express";
import { createPrescription , 
         getAllPrescriptions ,
         updatePrescriptionStatus,
         getUserPrescriptionForProduct } from "../controllers/prescription.controller.js";

import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();


router.get("/" , protectRoute, getAllPrescriptions)
router.post("/", protectRoute, createPrescription);
router.get("/product/:productId", protectRoute, getUserPrescriptionForProduct);
router.patch("/:id", protectRoute, updatePrescriptionStatus);

export default router;
