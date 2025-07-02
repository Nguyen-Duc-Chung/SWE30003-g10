const PrescriptionDetail = ({ prescription, onBack, onStatusChange }) => {
  if (!prescription) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded text-emerald-600">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to List
      </button>

      <h2 className="text-2xl font-bold mb-4">Prescription Detail</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p><strong>ID:</strong> {prescription._id}</p>
          <p><strong>Customer:</strong> {prescription.fullName}</p>
          <p><strong>Contact:</strong> {prescription.phoneNumber}</p>
          <p><strong>Status:</strong> {prescription.status}</p>
          <p><strong>Posted At:</strong> {new Date(prescription.createdAt).toLocaleString()}</p>
          <p><strong>Note:</strong> {prescription.note}</p>
        </div>
        <div className="relative w-full">
          <img src={prescription.images[0]} alt='Prescription Image' 
          className='rounded-lg border md:h-140 w-full object-cover h-full md:w-300'/>
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <button 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => onStatusChange(prescription._id, 'approved')}
        >
           Approve
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => onStatusChange(prescription._id, 'rejected')}
          >
            Reject
        </button>
      </div>
    </div>
  );
};

export default PrescriptionDetail;