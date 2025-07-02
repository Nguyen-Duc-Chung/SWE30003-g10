import OrderInfo from "../models/orderInfo.model.js";

export const createOrderInfo = async (req, res) => {
	try {
		const { province, district, street, note, deliveryType } = req.body;

		if (!province || !district || !street) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const newOrderInfo = await OrderInfo.create({
			user: req.user._id,
			province,
			district,
			street,
			note,
			deliveryType: deliveryType || "home",
		});

		res.status(201).json(newOrderInfo);
	} catch (err) {
		console.error("Error in createOrderInfo controller :", err.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getOrderInfo = async (req, res) => {
	try {
		const orderInfo = await OrderInfo.find({ user: req.user._id }).sort({ createdAt: -1 });
		res.json(orderInfo);
	} catch (err) {
		console.error("Error in getOrderInfo controller :", err.message);
		res.status(500).json({ message: "Server error" });
	}
};