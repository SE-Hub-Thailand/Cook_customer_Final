import PropTypes from "prop-types";
import React, { useState } from "react";

export default function PointsModal({ text, closeModal }) {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false); // ปิด modal ภายในคอมโพเนนต์นี้
    closeModal(); // เรียก closeModal ที่ถูกส่งเข้ามาจากภายนอกเพื่อปิด modal
  };

  if (!showModal) return null;

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={handleClose}
            >
              &times;
            </button>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                alt="Insufficient Points"
                className="w-32 h-32"
              />
            </div>

            {/* Text */}
            <p className="text-center text-lg font-semibold text-red-600 mt-4">
              {text}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

PointsModal.propTypes = {
  text: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

