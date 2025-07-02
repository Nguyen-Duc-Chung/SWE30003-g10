import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useOrderInfo = create((set) => ({
	orderList: [],
	loading: false,

	// Create new order info
	createOrderInfo: async (orderData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/orderInfo", orderData);
			toast.success("Thông tin nhận hàng đã được lưu!");
			set((state) => ({
				orderList: [res.data, ...state.orderList],
				loading: false,
			}));
		} catch (error) {
			console.error("Error creating order info:", error);
			toast.error(error.response?.data?.message || "Tạo thông tin thất bại");
			set({ loading: false });
		}
	},

	// Fetch all order info of the logged-in user
	fetchOrderInfo: async () => {
		set({ loading: true });
		try {
			const res = await axios.get("/orderInfo");
			set({ orderList: res.data, loading: false });
		} catch (error) {
			console.error("Error fetching order info:", error);
			toast.error("Không thể tải thông tin nhận hàng");
			set({ loading: false });
		}
	},
}));
