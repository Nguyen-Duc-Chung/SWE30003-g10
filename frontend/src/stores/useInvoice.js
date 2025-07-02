import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useInvoice = create((set) => ({
	invoiceData: null,
	loading: false,
	error: null,

	fetchInvoice: async () => {
		set({ loading: true, error: null });

		try {
			const res = await axios.get("/invoices");
			set({ invoiceData: res.data, loading: false });
		} catch (error) {
			console.error("Error fetching invoice info:", error);
			toast.error("Không thể tải hóa đơn");
			set({ loading: false, error: error.message });
		}
	},
}));
