import { useState , useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { useOrderInfo } from "../../stores/useOrderInfo";
import { useCartStore } from "../../stores/useCartStore.js";
import toast from "react-hot-toast";

const ConfirmInfo = ({ setActiveTab   }) => {

    // District options for each province
    const hanoiDistricts = [ "Quận Hoàn Kiếm", "Quận Hà Đông", "Quận Bắc Từ Liêm", "Quận Cầu Giấy", "Quận Hoàng Mai", ];
    const thanhHoaDistricts = [ "Huyện Bá Thước", "Huyện Cẩm Thủy", "Huyện Hoằng Hóa", "Huyện Hà Trung", "Huyện Hậu Lộc",];

    // List of districts shown based on selected province
    const [districts, setDistricts] = useState([]);

    // Get user data and order creation function from global store
    const { getUserInfo, user } = useUserStore();
    const { createOrderInfo } = useOrderInfo();

    // Loading state while fetching user data
    const [loadingUser, setLoadingUser] = useState(true);

    // Local form state to track user input for delivery info
    const [formData, setFormData] = useState({
        province: "Hà Nội", district: "", street: "", note: "",
    });

    // --------- TOTAL Amount of money --------- // 
    const { total } = useCartStore();
    const formattedTotal = total.toFixed(2);

    // Handle input changes for the form fields
    const handleChange = (e) => {
    setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }));
    };

    // Handle form submission: create order info and move to payment tab
    const handleSubmit = (e) => {
        e.preventDefault();

        createOrderInfo({
            province: formData.province,
            district: formData.district,
            street: formData.street,
            note: formData.note,
        });

        setActiveTab("payment");
    };

    // Fetch user info on component mount
    useEffect(() => {
        const fetchUser = async () => {
            await getUserInfo();
            setLoadingUser(false);
        };
        fetchUser();
    }, []);

    // Update district options when the province changes
    useEffect(() => {
        if (formData.province === "Hà Nội") {
            setDistricts(hanoiDistricts);
        } else if (formData.province === "Thanh Hóa") {
            setDistricts(thanhHoaDistricts);
        } else {
            setDistricts([]);
        }
        // Reset district when province is changed
        setFormData((prev) => ({ ...prev, district: "" })); // reset district
    }, [formData.province]);



  return (
    <>
        {/* /////// Confirm Information Section /////// */}
        <div className=" confirm_information_section w-[600px] max-w-full mx-auto mt-10 " >
        
            <div className="bg-white text-black rounded-2xl border border-gray-200 p-6 w-[600px] max-w-full mx-auto mt-4">
                <h2 className="text-lg font-semibold tracking-tight mb-4 text-gray-800 uppercase">
                THÔNG TIN KHÁCH HÀNG
                </h2>
                <div className="bg-white rounded-xl p-0">
                <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center">
                    <span className="text-base font-semibold mr-3">{user?.name || "..."}</span>
                    </div>
                    <span className="text-gray-500 text-base font-normal">{user?.phoneNumber || "..."}</span>
                </div>
                {/* Email row */}
                <div className="mb-1">
                    <span className="block text-xs text-gray-500 font-medium uppercase mb-1 tracking-widest">EMAIL</span>
                    <span className="block text-base font-semibold text-black">{user?.email || "..."}</span>
                    <hr className="border-t border-gray-200 mt-1 mb-2"/>
                </div>
                {/* Invoice note */}
                <div className="mb-4">
                    <span className="block text-xs text-gray-400 italic">
                    (*) Hóa đơn VAT sẽ được gửi qua email này
                    </span>
                </div>
                {/* Checkbox */}
                <label className="flex items-center mt-2 cursor-pointer select-none">
                    <input
                    type="checkbox"
                    className="w-5 h-5 mr-2 border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                    />
                    <span className="text-base text-gray-800 font-medium">
                    Nhận email thông báo và ưu đãi từ Long Chau
                    </span>
                </label>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="bg-white text-black mt-4 mx-auto rounded-xl border border-gray-200 p-6 w-[600px] max-w-full">

                    <h2 className="text-lg font-semibold mb-4 tracking-tight">THÔNG TIN NHẬN HÀNG</h2>

                    {/* Form for home delivery */}
                    
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                                TÊN NGƯỜI NHẬN
                            </label>
                            <div className="font-semibold text-base pl-1">{user?.name || "..."}</div>
                        </div>
                        {/* Phone */}
                        <div>
                            <label className="block text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                                SDT NGƯỜI NHẬN
                            </label>
                            <div className="font-semibold text-base pl-1">{user?.phoneNumber || "..."}</div>
                        </div>
                        {/* Province/City */}
                        <div>
                        <label className="block text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                            TỈNH / THÀNH PHỐ
                        </label>
                        <select 
                            name="province"
                            className="w-full border border-gray-200 rounded-lg h-10 px-3 text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={formData.province}
                            onChange={handleChange}
                            required
                        >
                            <option>Hà Nội</option>
                            <option>Thanh Hóa</option>
                        </select>
                        </div>
                        {/* District */}
                        <div>
                        <label className="block text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                            &nbsp;
                        </label>
                        <select
                            name="district"
                            className="w-full border border-gray-200 rounded-lg h-10 px-3 text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={formData.district}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Chọn quận/huyện</option>
                            {districts.map((district, idx) => (
                                <option key={idx} value={district}>
                                {district}
                                </option>
                            ))}
                        </select>
                        </div>
                        {/* Street */}
                        <div className="col-span-2" >
                        <label className="block text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                            &nbsp;
                        </label>
                        <input
                            name="street"
                            type="text"
                            placeholder="Số nhà, tên đường"
                            value={formData.street}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg h-10 px-3 text-base focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400"
                            required
                        />
                        </div>
                        {/* Notes (full width) */}
                        <div className="col-span-2">
                        <input
                            name="note"
                            type="text"
                            placeholder="Ghi chú khác (nếu có)"
                            value={formData.note}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg h-10 px-3 text-base focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400"
                        />
                        </div>
                    </div>

                </div>
                
                {/* BUTTON */}
                <div className="w-[600px] max-w-full mx-auto mt-4 mb-6 bg-white rounded-sm shadow-none border border-gray-100 p-2">
                    <div className="flex justify-between items-center mb-4">
                    <span className="text-md font-semibold text-gray-900">
                        Tổng tiền tạm tính:
                    </span>
                    <span className="text-md font-bold text-red-600">{Number(formattedTotal).toLocaleString("vi-VN")} đ</span>
                    </div>
                    <button
                    className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-150 text-white text-md font-normal rounded-lg py-1"
                    type="submit" >
                    Tiếp tục
                    </button>
                </div>
            </form>

        </div>
    </>
  )
}

export default ConfirmInfo