import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import "../index.css";
import coin from "../assets/images/coins.png";
import Container from '@mui/material/Container';
import BackgroundPoint from '../assets/images/fruit.png';
import { Link, useParams, useNavigate } from "react-router-dom";
import { convertDateTime } from '../components/ConvertDateTime';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertNoData from "../components/AlertNoData";
import { getAllRedeems } from "../api/strapi/redeemApi";
import QRCode from 'qrcode.react';

export default function HistoryPoint() {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [redeem, setHistoryPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedRedeem, setSelectedRedeem] = useState(null); // ใช้แทน isRedeemModalOpen

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistoryPoints = async () => {
      try {
        setLoading(true);
        const redeemData = await getAllRedeems(id, token);
        localStorage.setItem('redeem', JSON.stringify(redeemData));
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        setHistoryPoints(redeemData.length > 0 ? redeemData : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history points:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHistoryPoints();
  }, [id, token]);

  const handleOpenRedeemModal = (redeemItem) => {
    setSelectedRedeem(redeemItem);
  };

  const handleCloseRedeemModal = () => {
    setSelectedRedeem(null);
  };

  const handleQrCodeClick = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const qrImageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = qrImageUrl;
      link.download = "qr-code.png";
      link.click();
    }
  };

  if (loading) return <LoadingSpinner />;

  if (redeem === null || redeem.length === 0) {
    return (
      <>
        <Header />
        <AlertNoData title="No Points Data Available" message="You currently have no recorded point redemptions." />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <p className="text-center mt-16 text-2xl">คะแนนสะสม</p>
        <div className="flex justify-center mt-8">
          <img src={coin} alt="coins" width="120" />
        </div>
        <p className="text-center mt-8 text-xl font-semibold">{user?.point} แต้ม</p>
        <p className="text-center mt-10 text-2xl font-semibold">ประวัติการแลกแต้ม</p>

        {redeem.map((redeemItem, index) => (
          <div
            key={index}
            className="relative shadow-inner w-full max-w-md mx-auto h-auto bg-white mt-10 rounded-lg mb-6 p-4 cursor-redeemer"
          >
            <div
              className={`absolute top-0 right-0 mt-2 mr-2 px-4 py-1 rounded-lg text-white text-sm font-semibold ${
                redeemItem.status === "pending"
                  ? "bg-yellow-400"
                  : redeemItem.status === "approved"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {redeemItem.status === "pending"
                ? "Pending"
                : redeemItem.status === "approved"
                ? "Approved"
                : "Rejected"}
            </div>

            <div className="flex justify-center">
              <img
                src={
                  redeemItem.shop?.image?.data?.attributes?.url
                    ? `${API_URL}${redeemItem.shop.image.data.attributes.url}`
                    : BackgroundPoint
                }
                alt={`ร้าน ${redeemItem.shop?.name}`}
                className="rounded-full w-24 h-24 sm:w-32 sm:h-32 object-cover"
              />
            </div>
            <div className="flex justify-center mt-4 text-lg sm:text-xl font-semibold">
              <p>{redeemItem.shop.name}</p>
            </div>
            <div className="grid grid-cols-[4fr_2fr_3fr] mt-10 text-lg sm:text-xl">
              <p className="pl-4 sm:pl-8">แลกแต้มทั้งหมด</p>
              <p className="text-center">{redeemItem.totalPoints}</p>
              <p className="pr-4 sm:pr-8 text-right">แต้ม</p>
            </div>
            <p className="mt-6 mb-8 text-center text-lg sm:text-lg">
              {convertDateTime(redeemItem.date, redeemItem.time)}
            </p>
            <button
              className="absolute bottom-2 mt-2 mr-2 px-4 py-1 rounded-lg text-black text-sm font-semibold bg-blue-100"
              onClick={() => handleOpenRedeemModal(redeemItem)}
            >
              View QR Code
            </button>

            {selectedRedeem?.id === redeemItem.id && (
              <div
                className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50"
                onClick={handleCloseRedeemModal}
              >
                <div className="bg-slate-200 p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                  <h2 className="text-center text-lg text-black font-semibold m-4">QR Code สำหรับใช้ตอนรับสินค้า</h2>
                  <div onClick={handleQrCodeClick} className="flex justify-center items-center mt-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                    <QRCode value={selectedRedeem.qrCode} size={256} className="rounded-md" />
                  </div>
                  <div className="mt-4 flex space-x-4 justify-center">
                    <button
                      className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                      onClick={handleCloseRedeemModal}
                    >
                      Close 
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </Container>
    </>
  );
}