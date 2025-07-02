
import  { useState } from "react";
import ConfirmInfo from "../components/PaymentComponent/confirmInfo.jsx";
import ConfirmPayment from "../components/PaymentComponent/ConfirmPayment.jsx";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState("info"); // "info" or "payment"
  const navigate = useNavigate();

  return (
<>
    <div className=" bg-white rounded-xl overflow-hidden w-[600px] max-w-full mx-auto mt-20  pt-3">
        {/* Back Arrow & Title */}
        <div className=" flex items-center justify-center relative mb-2">
            <button
              aria-label="back"
              onClick={() => {
                if (activeTab === "payment") {
                  setActiveTab("info");
                } else {
                  navigate("/cart"); // Update this path to match your actual route name
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 ml-4"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M15 6L9 12L15 18" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="text-lg font-semibold text-gray-800 text-center select-none">
              Thông tin
            </span>
        </div>

        {/* Tab navigation */}
        <div className="flex w-full max-w-2xl mx-auto">
          {/* Tab 1: THÔNG TIN */}
          <div className="flex-1 text-center cursor-pointer" onClick={() => setActiveTab("info")} >
            <span
              className={`text-base font-bold tracking-wide ${ activeTab === "info" ? "text-red-600" : "text-gray-400" }`}
            >
              1. THÔNG TIN
            </span>
            <div className={`mt-1 h-[4px] w-full ${ activeTab === "info" ? "bg-red-600" : "bg-gray-300" }`}/>
          </div>

          {/* Tab 2: THANH TOÁN */}
          <div className="flex-1 text-center cursor-pointer" onClick={() => setActiveTab("payment")} >
            <span
              className={`text-base font-bold tracking-wide ${ activeTab === "payment" ? "text-red-600" : "text-gray-400" }`}
            >
              2. THANH TOÁN
            </span>
            <div className={`mt-1 h-[4px] w-full ${ activeTab === "payment" ? "bg-red-600" : "bg-gray-300" }`}/>
          </div>
        </div>

    </div>

    {activeTab === "info" && <ConfirmInfo setActiveTab={setActiveTab} />}
    {activeTab === "payment" && <ConfirmPayment />}


</>
  );
};

export default PaymentPage;
