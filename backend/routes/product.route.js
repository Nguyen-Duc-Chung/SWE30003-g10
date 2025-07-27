import express from "express";
import {
	createProduct,
	getProductById,
	deleteProduct,
	getAllProducts,
	getFeaturedProducts,
	getProductsByCategory,
	getRecommendedProducts,
	toggleFeaturedProduct,
	get_Products_By_Specific_Category,
	updateInventoryQuantities // ✅✅✅✅ NEW CODE FOR UPDATE INVENTORY QUANTITIES
	
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/specific_Category/:specific_category", get_Products_By_Specific_Category); 
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.post("/update-inventory", updateInventoryQuantities); // ✅✅✅✅ NEW CODE FOR UPDATE INVENTORY QUANTITIES
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/:id", getProductById);

export default router;