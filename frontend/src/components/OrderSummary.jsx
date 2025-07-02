import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
	"pk_test_51RNDbxFRT31SpY0BXSPLtvMokxXQSqCnyCaBBZaLb7myfYxAiDGErM0EwxBJQqFiZp1sXrXKq9eJcgWDlbZsY9fQ00SmIhR3HB"
);

const OrderSummary = () => {
	const { total, subtotal, cart , calculateTotalsSpecProduct } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);
	
	const handlePayment = async () => {
		const stripe = await stripePromise;
		const res = await axios.post("/payments/create-checkout-session", {
			products: cart,
		});

		const session = res.data;
		const result = await stripe.redirectToCheckout({
			sessionId: session.id,
		});

		if (result.error) {
			console.error("Error:", result.error);
		}
	};

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-emerald-400'>Order summary</p>

			<div className='space-y-4'>
				
				<div className="relative overflow-x-auto">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-5 py-3 rounded-s-lg">
									Product name
								</th>
								<th scope="col" className="px-5 py-3">
									Qty
								</th>
								<th scope="col" className="px-5 py-3 rounded-e-lg">
									Total Price
								</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((item) => (
								<>
								<tr key={item._id} className="bg-white dark:bg-gray-800 ">
									<th scope="row" 
										className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										{item.name.split(" ").slice(0, 2).join(" ")}
										{item.name.split(" ").length > 2 ? "..." : ""}
									</th>
									<td className="px-5 py-4">
										{item.quantity}
									</td>
									<td className="px-5 py-4">
										{calculateTotalsSpecProduct(item.price, item.quantity)} đ
									</td>
								</tr>
								</>									
							))}							
						</tbody>
					</table>
				</div>


				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Original price</dt>
						<dd className='text-base font-medium text-white'> {formattedSubtotal} đ </dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Savings</dt>
							<dd className='text-base font-medium text-emerald-400'>-{formattedSavings} đ </dd>
						</dl>
					)}

					<dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
						<dt className='text-base font-bold text-white'>Total</dt>
						<dd className='text-base font-bold text-emerald-400'> {formattedTotal} đ </dd>
					</dl>
				</div>

				<Link to='/payment' >
					<motion.button
						className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						// onClick={handlePayment}
					>
						Proceed to Checkout
					</motion.button>
				</Link>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>

				
			</div>

			

		</motion.div>
	);
};
export default OrderSummary;