import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { ShoppingCart , Eye , PackageX } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const [prescriptionStatus, setPrescriptionStatus] = useState(null);

	/*
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			// add to cart
			addToCart(product);
		}
	}; */

	//  ✅✅✅✅ NEW CODE
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		}

		const cartItem = useCartStore.getState().cart.find((item) => item._id === product._id);
		const currentQuantity = cartItem?.quantity || 0;

		if (currentQuantity >= product.Inventory_Quantity) {
			toast.error("Bạn đã thêm vượt quá số lượng tồn kho!", { id: "overstock" });
			return;
		}

		addToCart(product);
	};


	useEffect(() => {
		const checkPrescription = async () => {
		try {
			const res = await axios.get(`/prescriptions/product/${product._id}`);
			console.log("Prescription status (Card):", res.data);
			setPrescriptionStatus(res.data.status);
		} catch (err) {
			console.error("Error fetching prescription status in card:", err);
		}
		};

		if (product.requirePrescription && user) {
		checkPrescription();
		}
	}, [product._id, product.requirePrescription, user]);

	//  ✅✅✅✅ NEW CODE
	const canPurchase = (!product.requirePrescription || prescriptionStatus === "Chấp Thuận") && product.Inventory_Quantity > 0;

	return (
		// <Link to={`/productDetail/${product._id}`}>
			<div className=' bg-gray-800 text-white flex w-full h-[400px] 
			                   relative flex-col justify-between overflow-hidden 
							   rounded-lg borde shadow-lg cursor-pointer '>
				<Link to={`/productDetail/${product._id}`}>
				<div >			
					<div className='relative mx-2 mt-2 flex h-50 overflow-hidden rounded-xl'>
						<img className='object-cover w-full' src={product.image} alt='product image' />
					</div>
					<div className="px-3" >
						<h5 className='text-lg font-semibold tracking-tight '>  
							{product.name.split(" ").slice(0, 9).join(" ")}
							{product.name.split(" ").length > 9 ? "..." : ""}
						</h5>
						<div className='mt-2 mb-5 flex items-center justify-between'>
							<p>
								<span className='text-xl font-bold '>{product.price.toLocaleString("vi-VN")} đ</span>
							</p>
						</div>
		
					</div>

				</div>
				</Link>

				{/*
				<div className='flex-column space-y-1 items-center justify-center px-5 pb-5'>
					{canPurchase ? (
					<>			
						<button
							className='flex items-center w-full justify-center rounded-lg bg-emerald-600 px-5 py-2 text-center text-[15px] font-medium
							text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
							onClick={handleAddToCart}
						>
							<ShoppingCart size={22} className='mr-2' />
							Thêm vào giỏ
						</button>
					</>
					) : (
					<>
						<Link to={`/productDetail/${product._id}`}>
						<button
							className='flex items-center w-full justify-center rounded-lg bg-emerald-600 px-5 py-2 text-center text-[15px] font-medium
							text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
						>
							<Eye size={22} className='mr-2' />
							Xem chi tiết
						</button>
						</Link>
					</>
					)}
				</div>	*/}
                
				{/*  ✅✅✅✅ NEW CODE */}
				<div className='flex-column space-y-1 items-center justify-center px-5 pb-5'>
					{product.Inventory_Quantity > 0 ? (
						<>
						{canPurchase ? (
							<button
							className='flex items-center w-full justify-center rounded-lg cursor-pointer
							text-white bg-[#52b0cd] 
                            hover:bg-white hover:text-[#001543] duration-250 
							px-5 py-2 text-center text-[15px] font-medium
						      focus:outline-none focus:ring-4 '
							onClick={handleAddToCart}
							>
							<ShoppingCart size={22} className='mr-2' />
							Thêm vào giỏ
							</button>
						) : (
							<Link to={`/productDetail/${product._id}`}>
							<button
								className='flex items-center w-full justify-center rounded-lg cursor-pointer
							  text-white bg-[#52b0cd] 
                              hover:bg-white hover:text-[#001543] duration-250
								 px-5 py-2 text-center text-[15px] font-medium
								 focus:outline-none focus:ring-4 focus:ring-emerald-300'
							>
								<Eye size={22} className='mr-2' />
								Xem chi tiết
							</button>
							</Link>
						)}
						</>
						) : (
							<div className="flex items-center w-full justify-center rounded-lg 
							bg-[#878787] px-5 py-2 text-center text-[15px] font-medium
							text-white focus:outline-none focus:ring-4 cursor-not-allowed ">
							<PackageX size={22} className='mr-2' />
							Sản phẩm hết hàng
							</div>
						)}
					</div>


			</div>
		// </Link>
	);
};
export default ProductCard;