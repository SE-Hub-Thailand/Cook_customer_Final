import React from 'react';
import QRCode from 'qrcode.react';

const PendingQrModal = ({ redeem, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadQrCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const qrImageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = qrImageUrl;
      link.download = "qrcode.png"; // Set the download name
      link.click(); // Trigger the download
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="bg-slate-200 p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-center text-lg text-black font-semibold m-4">QR Code สำหรับใช้ตอนรับสินค้า</h2>
        <div className="text-center text-md text-black mb-2">ร้าน: {redeem.shop.name}</div>
        <div className="text-center text-md text-black mb-4">คะแนนที่ใช้: {redeem.totalPoints} แต้ม</div>
        <div className="flex justify-center items-center mt-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <QRCode value={redeem.qrCode} size={256} className="rounded-md" />
        </div>
        <div className="mt-4 flex space-x-4 justify-center">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={onClose}
          >
            Close
          </button>
          {/* <button
            className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={handleDownloadQrCode}
          >
            ดาวน์โหลด
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PendingQrModal; 