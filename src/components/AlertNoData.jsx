import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // นำ useNavigate เข้ามาใช้

const AlertNoData = ({ title, message }) => {
  const [isVisible, setIsVisible] = useState(true); // กำหนดสถานะแสดงผลเริ่มต้นเป็น true
  const navigate = useNavigate(); // เรียกใช้ useNavigate

  const handleClose = () => {
    setIsVisible(false); // เมื่อกดปุ่มกากบาทจะซ่อน Alert
    navigate(-1); // ย้อนกลับไปหน้าก่อนหน้า
  };

  if (!isVisible) return null; // ถ้าไม่แสดงผล (isVisible = false) ให้ return null

  return (
    <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
      <div className="flex justify-between">
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">{title}</p>
            <p className="text-sm">{message}</p>
          </div>
        </div>
        <div>
          {/* ปุ่มกากบาทสำหรับปิด Alert */}
          <button onClick={handleClose} className="text-teal-500">
            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10 3.636 5.05l1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertNoData;
