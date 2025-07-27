import React, { useEffect, useState } from 'react';
import axios from '../lib/axios'; // Make sure axios is pre-configured
import PrescriptionDetail from './PrescriptionDetail';
import { toast } from 'react-hot-toast';

const PrescriptionsTab = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await axios.get('/prescriptions');
        setPrescriptions(res.data.prescriptions || []);
      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleViewDetail = (prescription) => {
    setSelectedPrescription(prescription);
  };

  const handleBack = () => {
    setSelectedPrescription(null);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      console.log("Sending PATCH for prescription:", { id, newStatus });
      await axios.patch(`/prescriptions/${id}`, { status: newStatus });
      toast.success(`Đã cập nhật trạng thái: ${newStatus}`);

      setPrescriptions(prev =>
        prev.map(p => (p._id === id ? { ...p, status: newStatus } : p))
      );
      setSelectedPrescription(prev => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };


  if (selectedPrescription) {
    return <PrescriptionDetail prescription={selectedPrescription} 
                               onBack={handleBack} 
                               onStatusChange={handleStatusUpdate} 
            />;
  }

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4">Prescriptions</h2> */}

      {loading ? (
        <p className="text-center py-4">Đang tải...</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:max-w-7xl mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Mã Đơn Thuốc</th>
                <th scope="col" className="px-6 py-3">Khách Hàng</th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">Liên Hệ</th>
                <th scope="col" className="px-6 py-3">Ngày Đăng</th>
                <th scope="col" className="px-6 py-3">Trạng Thái</th>
                <th scope="col" className="px-6 py-3">Chi Tiết</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription, index) => (
                <tr
                  key={prescription._id}
                  className={`${
                    index % 2 === 0
                      ? 'bg-white dark:bg-gray-900'
                      : 'bg-gray-50 dark:bg-gray-800'
                  } border-b border-gray-200 dark:border-gray-700`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {prescription._id.slice(0, 8)}
                  </th>
                  <td className="px-6 py-4">{prescription.fullName}</td>
                  <td className="px-6 py-4 hidden md:table-cell">{prescription.phoneNumber}</td>
                  <td className="px-6 py-4">
                    {new Date(prescription.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        prescription.status === 'Chấp Thuận'
                          ? 'bg-green-100 text-green-700'
                          : prescription.status === 'Từ Chối'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {prescription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewDetail(prescription)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {prescriptions.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No prescriptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PrescriptionsTab;
