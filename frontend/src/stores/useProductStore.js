import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const response = await axios.post("/products", productData);
			set((prevState) => ({
				products: [...prevState.products, response.data],
				loading: false,
			}));
			toast.success("Đã Tạo Sản Phẩm Thành Công!"); //  success toast added here
		} catch (error) {
			toast.error(error.response.data.error || "Failed to create products");
			console.log("Error creating product:", error);
			set({ loading: false });
		}
	},
	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products");
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},

	getProductById: async (id) => {
		try {
			const response = await axios.get(`/products/${id}`);
			return response.data;
		} catch (error) {
			toast.error("Failed to fetch product");
			console.error("Error in getProductById:", error);
			return null;
		}
	},
	fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/category/${category}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},

	/*//////////////////////// NEW FUNCTION ////////////////////////*/
	fetch_Products_By_Specific_Category: async (specCategory) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/products/specific_Category/${specCategory}`);
			set({ products: response.data.products, loading: false})

		} catch(error) {
			set({ error: "Failed to fetch specific products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch specific products");
		}
		
	},


	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product");
		}
	},
	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},


}));