import { useState } from "react";
import { CreditCard, Banknote  } from 'lucide-react';

const paymentMethods = [
  {
    label: "Thanh toán tiền mặt khi nhận hàng",
    desc: "Không áp dụng thanh toán cho đơn hàng có sản phẩm Flash sale",
    icon: (
          <div className="bg-[#F2F6FF] rounded-lg flex items-center justify-center w-12 h-12">
            <Banknote size={28} className="text-blue-600" />
          </div>
    ),
    disabled: false,
  },

  {
    label: "Thanh toán qua Stripe (e-wallet, thẻ ATM, visa, etc...) ",
    icon: (
          <div className="bg-[#F2F6FF] rounded-lg flex items-center justify-center w-12 h-12">
            <CreditCard size={28} className="text-blue-600" />
          </div>
    ),
    disabled: false,
  },


];


export default function PaymentMethods({ setSelectedMethod }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (idx) => {
    if (!paymentMethods[idx].disabled) {
      setSelected(idx);
      setSelectedMethod(idx); // communicate selected method back to parent
    }
  };

  return (
    <div className="w-[600px] max-w-full mx-auto mt-4 bg-white rounded-xl px-6 py-4 shadow border border-gray-100">
      <h2 className="font-semibold text-lg text-gray-900 mb-2">
        Chọn phương thức thanh toán
      </h2>
      <div>
        {paymentMethods.map((method, idx) => (
          <div
            key={method.label}
            className={`flex items-start py-3 px-2 md:px-4 rounded-xl transition-colors duration-150 ${
              selected === idx
                ? "bg-[#F2F6FF] border border-[#2563eb]"
                : "hover:bg-gray-50"
            } ${idx !== 0 ? "mt-1" : ""} ${
              method.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => handleSelect(idx)}
          >
            <div className="pt-1">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                  selected === idx
                    ? "border-[#2563eb]"
                    : "border-gray-300"
                }`}
              >
                {selected === idx && (
                  <span className="w-3 h-3 bg-[#2563eb] rounded-full block"></span>
                )}
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">{method.icon}</div>
            <div className="ml-4 flex flex-col">
              <span
                className={`font-medium text-base text-gray-900 leading-snug ${
                  method.disabled ? "text-gray-400" : ""
                }`}
              >
                {method.label}
              </span>
              {method.desc && (
                <span className="text-sm text-gray-400 mt-1">
                  {method.desc}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function useSelectedPaymentMethod() {
  const [selected, setSelected] = useState(null);
  return { selected, setSelected };
}

