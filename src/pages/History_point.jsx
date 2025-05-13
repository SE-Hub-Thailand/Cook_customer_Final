import React from "react";
import Header from "../components/Header.jsx";
import "../index.css";
import coin from "../assets/images/coins.png";
import Container from '@mui/material/Container';
import BackgroundPoint from '../assets/images/fruit.png';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { getAllHistoryPoints } from "../api/strapi/historyPointApi";
import { convertDateTime } from '../components/ConvertDateTime';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertNoData from "../components/AlertNoData";
import { getAllRedeems } from "../api/strapi/redeemApi";
import RedeemDetails from "./RedeemDetails";
import Alert from "../components/Alert";
import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import QRCode from 'qrcode.react';

export default function HistoryPoint() {
  console.log("heloooo in HistoryPoint");
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("jwt");
  const { id } = useParams();
  const [redeem, setHistoryPoints] = useState(null); // เปลี่ยนจาก false เป็น null เพื่อเช็คง่ายขึ้น
  // const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistoryPoints = async () => {
      try {
        setLoading(true);
        console.log("Fetching history points...");
        const redeemData = await getAllRedeems(id, token);
        localStorage.setItem('redeem', JSON.stringify(redeemData));
        // getAllHistoryPoints(id, token);
        // console.log("redeemData: ", redeemData);
        console.log("JSON.stringify(redeemData): ", JSON.stringify(redeemData));

        // console.log("redeemData.length: ", redeemData.length);
        // console.log("json parse Point: ", JSON.parse(localStorage.getItem('redeem')));

        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        // const user = localStorage.getItem('user');

        // console.log("user point: ", user);
        // console.log("points[0].customer.point: ", user.point);

        // ตั้งค่าข้อมูลแต้ม หรือ ถ้าไม่มีข้อมูลตั้งค่าเป็น array ว่าง
        setHistoryPoints(redeemData.length > 0 ? redeemData : []);
        setLoading(false); // หยุด loading
      } catch (error) {
        console.error("Error fetching history points:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHistoryPoints();
  }, [id, token]);
  const [isOn, setIsOn] = useState(false);
  const [isShowQr, setIsShowQr] = useState(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const handleOpenRedeemModal = () => setIsRedeemModalOpen(true);
  const handleCloseRedeemModal = () => setIsRedeemModalOpen(false);

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

  // ถ้ากำลังโหลดอยู่ ให้แสดง LoadingSpinner
  if (loading) return <LoadingSpinner />;

    // console.log("points[0].customer.point: ", ${user.point});
  // ไม่แสดง error ถ้ามีปัญหา แต่ไม่มีข้อมูล
  if (redeem === null || redeem.length === 0) {
    return (
      <>
        <Header />
        <AlertNoData title="No Points Data Available" message="You currently have no recorded point redemptions." />
      </>
    );
  }

  // ถ้ามีข้อมูล ให้แสดงเนื้อหา

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

        {redeem.map((redeem, index) => (
          <Link
            // to={`/redeem-details/${redeem.id}`} // กำหนดลิงก์ไปยังหน้าที่ต้องการ พร้อมกับ redeem id
            key={index}
            onClick={() => setShowModal(true)}
          >
            <div
              className="relative shadow-inner w-full max-w-md mx-auto h-auto bg-white mt-10 rounded-lg mb-6 p-4 cursor-redeemer"
            >
              {/* กล่องสถานะที่มุมขวาบน */}
              <div
                className={`absolute top-0 right-0 mt-2 mr-2 px-4 py-1 rounded-lg text-white text-sm font-semibold ${
                  redeem.status === "pending"
                    ? "bg-yellow-400"
                    : redeem.status === "approved"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {redeem.status === "pending"
                  ? "Pending"
                  : redeem.status === "approved"
                  ? "Approved"
                  : "Rejected"}
              </div>

              <div className="flex justify-center">
                <img
                  src={
                    redeem.shop?.image?.data?.attributes?.url
                      ? `${API_URL}${redeem.shop.image.data.attributes.url}`
                      : BackgroundPoint
                  }
                  alt={`ร้าน ${redeem.shop?.name}`}
                  className="rounded-full w-24 h-24 sm:w-32 sm:h-32 object-cover"
                />
              </div>
              <div className="flex justify-center mt-4 text-lg sm:text-xl font-semibold">
                <p>{redeem.shop.name}</p>
              </div>
              <div className="grid grid-cols-[4fr_2fr_3fr] mt-10 text-lg sm:text-xl">
                <p className="pl-4 sm:pl-8">แลกแต้มทั้งหมด</p>
                <p className="text-center">{redeem.totalPoints}</p>
                <p className="pr-4 sm:pr-8 text-right">แต้ม</p>
              </div>
              <p className="mt-6 mb-8 text-center text-lg sm:text-lg">
                {convertDateTime(redeem.date, redeem.time)}
              </p>
              <button
                className="absolute bottom-2 mt-2 mr-2 px-4 py-1 rounded-lg text-black text-sm font-semibold bg-blue-100"
                onClick={handleOpenRedeemModal}
              >
                View QR Code
              </button>
              {isRedeemModalOpen && redeem.qrCode !== null &&
              <div
              className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50"
              onClick={handleCloseRedeemModal}
            >
              <div className="bg-slate-200 p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-lg text-black font-semibold m-4">QR Code สำหรับใช้ตอนรับสินค้า</h2>
                <div onClick={handleQrCodeClick} className="flex justify-center items-center mt-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                  <QRCode value={redeem.qrCode} size={256} className="rounded-md" />
                </div>
                <div className="mt-4 flex space-x-4 justify-center">
                  <button
                    className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleCloseRedeemModal}
                  >
                    Close
                  </button>
                  {/* <button
                    className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleDownloadQrCode}
                  >
                    Download
                  </button> */}
                </div>

              </div>
            </div>

              // ? (
              //   <Alert
              //     title="ไม่พบข้อมูลการแลกแต้ม!"
              //     message=""
              //     path="0"
              //     status="fail"
              // />)
              //   : (
                  // <RedeemDetails
                  //   qrCode={redeem.qrCode}
                  //   isOpen={isRedeemModalOpen}
                  //   onClose={handleCloseRedeemModal}/>
                  // )
              }

            </div>
          </Link>
        ))}
      </Container>
    </>
  );
}
