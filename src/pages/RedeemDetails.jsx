import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
// import ReactSlider from "react-slider";
import { HiX } from "react-icons/hi";
// import { createInvoice } from "../../api/strapi/invoiceApi";
import { getRedeemsByQrCode } from "../api/strapi/redeemApi";
import { useNavigate } from "react-router-dom";

export default function RedeemDetails({qrCode, isOpen, onClose,}) {
  if (!qrCode || !isOpen) {
  }

  RedeemDetails.propTypes = {
    qrCode: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const [showModal, setShowModal] = useState(isOpen); // Modal is initially visible
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShowModal(false); // Close modal on button click
    navigate(-1);
  };

  useEffect(() => {
    const fetchRedeem = async () => {
      try {
        const redeemArray = await getRedeemsByQrCode(qrCode);

        if (redeemArray && redeemArray.productJsonArray && redeemArray.productJsonArray.length !== undefined) {
          const list = JSON.parse(redeemArray.productJsonArray);
          const productArray = JSON.parse(list);
          console.log("productArray itemm: ", productArray);
          setItems(productArray);
        }
        setLoading(false); // หยุด loading
      } catch (error) {
        console.error("Error fetching history points:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRedeem();
  }, [qrCode]);

  const totalpoint = items.reduce((sum, item) => sum + item.counts * item.point, 0);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg h-screen">
            {/* Close Button */}
            <div className="w-full h-12 bg-red-600 flex items-center justify-end px-3 mb-4">
              <HiX className="text-xl text-white cursor-pointer" onClick={onClose} />
            </div>

            {/* Table */}
            <div className="w-full p-6">
              <table className="min-w-full border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border border-black">รายการสินค้า</th>
                    <th className="px-4 py-2 border border-black">จำนวน</th>
                    <th className="px-4 py-2 border border-black">มูลค่า (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2 border-r border-black">{item.name}</td>
                      <td className="px-4 py-2 border-r border-black">{item.counts}</td>
                      <td className="px-4 py-2">{item.point}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex justify-between items-center font-bold">
                <span className="text-lg">รวมเป็นมูลค่า</span>
                <span className="text-lg">{totalpoint}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;บาท</span>
              </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
