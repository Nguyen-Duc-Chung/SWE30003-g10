import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "../lib/axios";
import { Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PrescriptionPage = () => {
  const location = useLocation();
  const product = location.state?.product || {};

  const [prescription, setPrescription] = useState({
    fullName: '',
    phoneNumber: '',
    note: '',
    image: '',
    productId: product._id || null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrescription((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("Submitting:", prescription);
      await axios.post('/prescriptions', prescription);
      toast.success('Gửi đơn thuốc thành công!');
      setPrescription({
        fullName: '',
        phoneNumber: '',
        note: '',
        image: '',
        productId: product._id || null,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Gửi thất bại');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 md:py-20 flex flex-col md:flex-row justify-center items-start gap-6">
      {/* Left Panel */}
      <div className="w-full md:w-[800px] h-[600px] bg-white text-black shadow border rounded-lg p-6 flex flex-col gap-4 overflow-auto">
        <h2 className="text-xl font-semibold">Cần mua thuốc</h2>
        <form>
          {/* Thông tin liên hệ */}
          <div className="space-y-2">
            <h3 className="font-medium">Thông tin liên hệ</h3>
            <div className="flex gap-4">
              <input
                type="text"
                name="fullName"
                value={prescription.fullName}
                placeholder="Họ và tên"
                className="border rounded px-4 py-2 w-1/2"
                onChange={handleChange}
              />
              <input
                type="text"
                name="phoneNumber"
                value={prescription.phoneNumber}
                placeholder="Số điện thoại"
                className="border rounded px-4 py-2 w-1/2"
                onChange={handleChange}
              />
            </div>
            <textarea
              rows={3}
              name="note"
              value={prescription.note}
              placeholder="Ghi chú (không bắt buộc)"
              className="border rounded px-4 py-2 w-full"
              onChange={handleChange}
            />
          </div>

          {/* Ảnh chụp đơn thuốc */}
          <div className="space-y-2 mt-4">
            <h3 className="font-medium">Ảnh chụp đơn thuốc</h3>
            <div className="border border-dashed border-gray-400 rounded-lg p-4 text-center text-sm text-gray-500">
              <input
                type="file"
                id="image"
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image"
                className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <Upload className="h-5 w-5 inline-block mr-2" />
                Tải ảnh lên
              </label>
              {prescription.image && (
                <span className="ml-3 text-sm text-gray-400">Đã tải ảnh</span>
              )}
            </div>
          </div>
        </form>

        {/* Danh sách sản phẩm */}
        <div className="space-y-2 mt-4">
          <h3 className="font-medium">Danh sách sản phẩm cần tư vấn</h3>
          <div className="bg-gray-100 rounded-lg p-2 flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <img
                src={product.image || 'https://via.placeholder.com/48'}
                alt={product.name || 'Thuốc'}
                className="object-cover w-18 h-14 rounded"
              />
              <span className="font-medium flex-1">{product.name || 'Tên sản phẩm'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-[350px] h-[600px] bg-white shadow border rounded-lg p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold mb-2">Quy trình tư vấn tại Long Châu</h3>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 mb-4">
            <li>
              Quý khách vui lòng điền thông tin liên hệ, cung cấp ảnh đơn thuốc hoặc tên sản phẩm cần tư vấn (nếu có).
            </li>
            <li>Dược sĩ chuyên môn của nhà thuốc sẽ gọi lại tư vấn miễn phí cho quý khách.</li>
            <li>Quý khách có thể tới các Nhà thuốc Long Châu gần nhất để được hỗ trợ mua hàng trực tiếp.</li>
          </ol>
          <div className="bg-gray-100 p-3 rounded text-sm text-gray-700">
            <strong className="block mb-1">Lưu ý:</strong>
            - Nếu mua thuốc kê đơn, vui lòng mang theo đơn thuốc.<br />
            - Dược sĩ vẫn sẽ chủ động tư vấn cho quý khách kể cả trong trường hợp không có đơn thuốc.
          </div>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          className="bg-blue-600 text-white font-semibold w-full py-2 rounded mb-4 disabled:opacity-50"
        >
          {loading ? 'Đang gửi...' : 'Gửi Yêu Cầu Tư Vấn'}
        </button>
      </div>
    </div>
  );
};

export default PrescriptionPage;
