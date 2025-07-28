const PrescriptionDetail = ({ prescription, onBack, onStatusChange }) => {
  if (!prescription) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-800 shadow-xl/30 rounded text-white">
      <button
        onClick={onBack}
        className="flex items-center px-3 py-2 mx-2 rounded-md transition-colors duration-200
         text-white text-sm bg-gray-700 hover:bg-gray-600 "
      >
        ← Quay lại trang
      </button>

      <h2 className="text-3xl font-bold mb-4 text-center text-[#88D9F2] "> Chi Tiết Đơn Thuốc </h2>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 text-lg ">
        <div className=" my-auto space-y-2 text-block-prescriptionDetails ">
          <p><strong>ID:</strong> {prescription._id}</p>
          <p><strong>Khách Hàng:</strong> {prescription.fullName}</p>
          <p><strong>Thông Tin Liên Hệ:</strong> {prescription.phoneNumber}</p>
          <p><strong>Trạng Thái Đơn Thuốc:</strong> {prescription.status}</p>
          <p><strong>Ngày Đăng:</strong> {new Date(prescription.createdAt).toLocaleString()}</p>
          <p><strong>Ghi Chú:</strong> {prescription.note}</p>
        </div>
        <div className="relative w-full">
          <img src={prescription.images[0]} alt='Prescription Image' 
          className='rounded-lg shadow-xl border-none md:h-140 w-full object-cover h-full md:w-300'/>
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <button 
          className="bg-[#2D8F4E] hover:bg-[#50C878] duration-300 text-white px-4 py-2 rounded"
          onClick={() => onStatusChange(prescription._id, 'Chấp Thuận')}
        >
           Chấp Thuận
        </button>

        <button
          className="bg-[#B12C00] hover:bg-red-600 duration-300 text-white px-4 py-2 rounded"
          onClick={() => onStatusChange(prescription._id, 'Từ Chối')}
          >
            Từ Chối
        </button>
      </div>
    </div>
  );
};

export default PrescriptionDetail;