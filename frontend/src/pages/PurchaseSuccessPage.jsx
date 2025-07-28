import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import Invoice from "../components/Invoice";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
	const sessionId = new URLSearchParams(window.location.search).get("session_id");

	const handleCheckoutSuccess = async (sessionId) => {
		try {
		await axios.post("/payments/checkout-success", {
			sessionId,
		});
		} catch (error) {
		console.log(error);
		} finally {
		clearCart();
		setIsProcessing(false);
		}
	};

	if (sessionId) {
		handleCheckoutSuccess(sessionId);
	} else {
		// If no sessionId (e.g., cash payment), just clear the cart
		clearCart();
		setIsProcessing(false);
	}
	}, [clearCart]);


	if (isProcessing) return "Processing...";

	if (error) return `Error: ${error}`;

	return (
		<>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>
			<div  className='h-full flex-column  items-center justify-center m-15 px-4  '>


				<div className='max-w-md w-full mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10 m-4 '>
					<div className='p-3 sm:p-5'>
						<div className='flex justify-center'>
							<CheckCircle className='text-[#88D9F2] w-12 h-12 mb-2' />
						</div>
						<h1 className='text-2xl sm:text-3xl font-bold text-center text-[#88D9F2] mb-2'>
							Mua hàng thành công!
						</h1>


						<p className='text-white text-center text-sm mb-6'>
							Kiểm tra email của bạn để biết thông tin chi tiết về đơn hàng và cập nhật.
						</p>

						<div className='space-y-4'>
							<button
							className='w-full font-bold py-2 px-4
							text-white bg-[#52b0cd] 
                            hover:bg-white hover:text-[#001543] duration-450 
				              rounded-lg transition flex items-center justify-center'
							>
								<HandHeart className='mr-2' size={18} />
								Cảm ơn bạn đã tin tưởng chúng tôi!
							</button>
							<Link
								to={"/"}
								className='w-full bg-gray-700 hover:bg-gray-600 text-[#52b0cd] font-bold py-2 px-4 
				rounded-lg transition duration-300 flex items-center justify-center'
							>
								Tiếp tục mua sắm
								<ArrowRight className='ml-2' size={18} />
							</Link>
						</div>
					</div>
				</div>

				<Invoice/>
			</div>

		</>
	);
};
export default PurchaseSuccessPage;