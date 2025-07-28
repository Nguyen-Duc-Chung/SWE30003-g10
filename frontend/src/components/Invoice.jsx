import { useEffect } from "react";
import { Mail, Globe, Phone } from "lucide-react";
import { useInvoice } from "../stores/useInvoice.js";

const Invoice = () => {
  const { invoiceData, fetchInvoice } = useInvoice();

  useEffect(() => {
    const fetchInvoiceInfo = async () => {
      await fetchInvoice();
    };
    fetchInvoiceInfo();
  }, []);

  if (!invoiceData) return null;

  return (
    <div className="w-[678px] h-[784px] mx-auto bg-white shadow-2xl rounded-[16px] overflow-hidden relative text-[#222] font-sans text-[15px]">
      {/* Header */}
      <div className="w-full relative bg-[#14213d] h-[140px] px-[34px] pt-6 pb-3">
        <div className="absolute left-[34px] top-6 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 border-2 border-white rounded-md flex items-center justify-center">
              <div className="w-6 h-6 border border-white rounded"></div>
            </div>
            <div>
              <div className=" text-[35px] text-[#88D9F2] font-bold tracking-wider leading-4">Long Chau</div>
            </div>
          </div>
        </div>
        <div className="absolute right-[34px] top-8 flex flex-col gap-3 items-end">
          <div className="flex items-center gap-3 text-white text-[15px]">
            <Phone size={18} className="text-white opacity-90" />
            <span className="opacity-90">+00 123 45X XX</span>
          </div>
          <div className="flex items-center gap-3 text-white text-[15px]">
            <Globe size={18} className="text-white opacity-90" />
            <span className="opacity-90">www.example.com</span>
          </div>
          <div className="flex items-center gap-3 text-white text-[15px]">
            <Mail size={18} className="text-white opacity-90" />
            <span className="opacity-90">mail@example.com</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-[34px] pt-8 pb-5">
        <div className="flex flex-row justify-between gap-10">
          <div>
            <div className="text-[15px] font-semibold tracking-widest mb-1">Hóa Đơn Tới:</div>
            <div className="font-bold text-[15px] mb-[2px]">{invoiceData?.customerName}</div>
            <div className="text-[14px] w-[60%] opacity-80 leading-[1.4]">
              {invoiceData?.address}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[35px] font-bold text-[#60c0dd] mb-1">Hóa Đơn</div>
            <div className="text-[14px] font-bold leading-5 flex flex-col gap-1">
              <div>
                <span className="text-[#222] font-bold">Hóa Đơn Số:</span>
                <span className="font-normal ml-2 block ">{invoiceData?._id?.slice(-6)}</span>
              </div>
              <div>
                <span className="text-[#222] font-bold">Ngày/Tháng/Năm: </span>
                <span className="font-normal ml-2">{new Date(invoiceData?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="mt-8">
          <div className="flex w-full bg-[#14213d] rounded-t-[6px] overflow-hidden text-white text-[15px] font-semibold">
            <div className="w-[60px] px-3 py-2 text-center">STT</div>
            <div className="flex-1 px-3 py-2">Mô tả sản phẩm</div>
            <div className="w-[92px] px-3 py-2 text-center bg-[#60c0dd] text-[#14213d]">Giá</div>
            <div className="w-[80px] px-3 py-2 text-center bg-[#60c0dd] text-[#14213d]">S.Lượng</div>
            <div className="w-[150px] px-3 py-2 text-center bg-[#60c0dd] text-[#14213d]">Thành Tiền</div>
          </div>

          {invoiceData?.cartItems?.map((item, i) => (
            <div
              key={i}
              className={`flex w-full text-[15px]  bg-[#f6f6f6]"
                 ${i % 2 === 0 ? "bg-[#f6f6f6]" : "bg-white" }`}
            >
              <div className="w-[60px] px-3 py-2 text-center font-medium ">
                {(i + 1).toString().padStart(2, "0") + "."}
              </div>
              <div className="flex-1 px-3 py-2">{item.name}</div>
              <div className="w-[92px] px-3 py-2 text-center">{item.price.toLocaleString()} đ</div>
              <div className="w-[80px] px-3 py-2 text-center">{item.quantity}</div>
              <div className="w-[150px] px-3 py-2 text-center">{(item.price * item.quantity).toLocaleString()} đ</div>
            </div>
          ))}
        </div>

        {/* Payment & Summary */}
        <div className="flex mt-8">
          <div className="flex-1 text-[14px]">
            <div className="font-semibold mb-1">Payment Info:</div>
            <div>Account: 1122004466</div>
            <div>A/C Name:</div>
            <div>Bank Details: Add Your Bank Details</div>
          </div>
          <div className="w-[230px] flex flex-col gap-2 ml-auto">
            <div className="flex justify-between text-[15px] mb-1">
              <span>Tổng phụ:</span>
              <span className="font-bold">{invoiceData?.totalAmount?.toLocaleString()} đ</span>
            </div>
            <div className="flex justify-between text-[15px] mb-1">
              <span>Thuế:</span>
              <span className="font-bold">0.00%</span>
            </div>
            <div className="flex justify-end">
              <div className="flex items-center bg-[#60c0dd] rounded-lg px-4 py-2 font-semibold text-[18px] text-white shadow-md mt-2">
                Tổng tiền: {invoiceData?.totalAmount?.toLocaleString()} đ
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 flex flex-col gap-1">
          <div className="text-[18px] font-bold tracking-wider mb-1">THANK YOU FOR YOUR BUSINESS</div>
          <div className="text-[13px] text-[#888] leading-tight">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="w-full h-[18px] bg-[#14213d] absolute bottom-0 left-0 rounded-b-[16px]"></div>
    </div>
  );
};

export default Invoice;
