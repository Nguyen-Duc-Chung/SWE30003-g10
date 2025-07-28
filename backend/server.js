import express from "express"
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from './routes/coupon.route.js'
import paymentRoutes from './routes/payment.route.js'
import prescriptionRoutes from './routes/prescription.route.js'
import orderInfoRoutes from './routes/orderInfo.route.js'
import invoiceRoutes from "./routes/invoice.route.js";
import analyticsRoutes from "./routes/analytics.route.js"; //✅✅✅✅ NEW CODE


import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000 ;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes );
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/orderInfo", orderInfoRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/analytics", analyticsRoutes);  //✅✅✅✅ NEW CODE


app.listen(5000, () => {
    console.log("Server is running on port " + PORT);

    connectDB();
});


