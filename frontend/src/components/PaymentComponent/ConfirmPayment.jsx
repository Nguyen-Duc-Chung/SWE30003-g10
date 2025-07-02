
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentMethods from './PaymentMethods.jsx'
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../lib/axios";
import { useCartStore } from "../../stores/useCartStore.js";
import { useUserStore } from "../../stores/useUserStore";
import { useOrderInfo } from "../../stores/useOrderInfo.js";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
    "pk_test_51RNDbxFRT31SpY0BXSPLtvMokxXQSqCnyCaBBZaLb7myfYxAiDGErM0EwxBJQqFiZp1sXrXKq9eJcgWDlbZsY9fQ00SmIhR3HB"
);
const ConfirmPayment = () => {
    const { getUserInfo, user } = useUserStore();
    const { orderList, fetchOrderInfo } = useOrderInfo();
    const [loading, setLoading] = useState(false);
    const { cart, total, calculateTotalsSpecProduct } = useCartStore(); // --------- TOTAL Amount of money --------- // 
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState(null);

    const formattedTotal = total.toFixed(2);
    const latestOrder = orderList[0];
    const province = latestOrder?.province || "...";
    const district = latestOrder?.district || "...";
    const street = latestOrder?.street || "...";
    const note = latestOrder?.note || "...";
    const address = `${street} - ${district} - ${province}`;

    const handleInvoiceCreation = async () => {
        try {
            await axios.post("/invoices", {
                customerName: user?.name,
                phoneNumber: user?.phoneNumber,
                email: user?.email,
                address: address,
                totalAmount: total,
                cartItems: cart.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                totalSpecProductAmount: calculateTotalsSpecProduct(item.price, item.quantity),
                })),
            });
        } catch (error) {
            console.error("Failed to create invoice:", error);
        }
    };



    const handlePayment = async () => {
        setLoading(true);
        try{
            const stripe = await stripePromise;
            const res = await axios.post("/payments/create-checkout-session", {
                products: cart,
            });

            // UPDATE CODE PART - 🧾 Create invoice before redirect
            await handleInvoiceCreation();

            const session = res.data;
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error("Error:", result.error);
            }
        } catch(error){
            console.error("Payment error:", error);
        } finally {
		    setLoading(false);
	    }
	};

    // Fetch user info on component mount
    useEffect(() => {
        const fetchUser = async () => {
            await getUserInfo();
            await fetchOrderInfo();
        };
        fetchUser();
    }, []);

  return (
    <>
    <div className="payment_information_section mx-auto mt-10">

        <div className=" mx-auto mt-4 bg-white rounded-xl border border-gray-200 p-6 w-[600px] max-w-full" >

            {/* Order rows */}
            <div className="flex justify-between items-center mb-2 text-base">
                <span className="text-gray-500">Số lượng sản phẩm</span>
                <span className="text-gray-800 font-medium"> {cart?.length || "..."} </span>
            </div>
            <div className="flex justify-between items-center mb-2 text-base">
                <span className="text-gray-500">Tổng tiền hàng</span>
                <span className="text-gray-800 font-medium"> {formattedTotal || "..." } đ </span>
            </div>
            <div className="flex justify-between items-center mb-2 text-base">
                <span className="text-gray-500">Phí vận chuyển</span>
                <span className="text-gray-800 font-medium">Miễn phí</span>
            </div>
            {/* Divider */}
            <div className="border-t border-gray-200 my-3"></div>
            {/* Total */}
            <div className="flex justify-between items-center text-lg mb-0">
                <span className="font-bold text-black">
                Tổng tiền
                </span>
                <span className="font-bold text-black text-xl"> {formattedTotal || "..." } đ </span>
            </div>
        </div>

        <PaymentMethods setSelectedMethod={setSelectedMethod} />

        <div className="bg-white rounded-xl mx-auto mt-4 border border-gray-200 p-6 w-[600px] max-w-full">
            <h2 className="text-lg font-semibold tracking-tight mb-4 text-gray-800 uppercase">
            THÔNG TIN NHẬN HÀNG
            </h2>
            <div className="bg-white rounded-xl">
                {/* Khách hàng */}
                <div className="flex justify-between items-center mb-2 text-base">
                    <span className="text-gray-500">Khách hàng</span>
                    <span className="text-gray-800 font-medium">{user?.name || "..."}</span>
                </div>
                {/* Số điện thoại */}
                <div className="flex justify-between items-center mb-2 text-base">
                    <span className="text-gray-500">Số điện thoại</span>
                    <span className="text-gray-800 font-medium">{user?.phoneNumber || "..."}</span>
                </div>
                {/* Email */}
                <div className="flex justify-between items-center mb-2 text-base">
                    <span className="text-gray-500">Email</span>
                    <span className="text-gray-800 font-medium">{user?.email || "..."}</span>
                </div>
                {/* Nhận hàng tại */}
                <div className="flex justify-between items-center mb-2 text-base">
                    <div className=" text-gray-500 text-base">Nhận hàng tại</div>
                    <div className=" text-black font-medium text-base w-[50%] ">
                        {street || "..." } - {district || "..." } - {province || "..." }
                    </div>
                </div>
                {/* Ghi chú */}
                <div className="flex justify-between items-center mb-2 text-base">
                    <span className="text-gray-500">Ghi chú</span>
                    <span className="text-gray-800 font-medium">{note}</span>
                </div>


            </div>
        </div>

        <div className="w-[600px] max-w-full mx-auto mt-4 mb-6 bg-white rounded-sm shadow-none border border-gray-100 p-2">
            <div className="flex justify-between items-center mb-4">
            <span className="text-md font-semibold text-gray-900">
                Tổng tiền tạm tính:
            </span>
            <span className="text-md font-bold text-red-600"> {formattedTotal || "..." } đ </span>
            </div>
            <button
            className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-150 text-white text-md font-normal rounded-lg py-1"
            onClick={async () => {
                if (selectedMethod === 0) {
                    await handleInvoiceCreation(); // 🧾 Save invoice for cash method
                    navigate('/purchase-success');
                } else if (selectedMethod === 1) {
                    handlePayment();
                } else {
                    toast.error("Vui lòng chọn phương thức thanh toán.");
                }
                }} 
            >
                {loading ? 'Đang xử lý...' : 'Thanh Toán'}
            </button>
        </div>

    </div>
    </>
  )
}

export default ConfirmPayment