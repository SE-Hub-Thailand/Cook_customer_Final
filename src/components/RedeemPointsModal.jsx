import React from 'react';
import Swal from 'sweetalert2';

const RedeemPointsModal = ({ point, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    Swal.fire({
      icon: "success",
      text: "ระบบได้ทำการหักแต้มของคุณสำเร็จแล้ว กรุณานำ QR Code ที่ได้รับไปแสดงที่ร้านค้าเพื่อรับสินค้า",
      position: "center",
      showConfirmButton: true,
      confirmButtonText: "ตกลง",
    });
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636a9 9 0 11-12.728 12.728 9 9 0 0112.728-12.728zM12 9v2m0 4h.01"
                />
              </svg>
            </div>
            <h2 className="ml-3 text-xl font-semibold text-gray-800">ยืนยันการแลกแต้ม</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          ระบบกำลังจะหัก {point} คะแนนของคุณเพื่อแลกสินค้า กรุณากด OK เพื่อยืนยันการทำรายการ
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-all"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedeemPointsModal;
