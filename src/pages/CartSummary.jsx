import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { generateRandomString } from "../api/utils/random";
import Header from '../components/Header';
import AlertNoData from '../components/AlertNoData';
import RedeemPointsModal from '../components/RedeemPointsModal';
import { createRedeem } from "../api/strapi/redeemApi";
import { updateUser } from "../api/strapi/userApi";
// import { PaymentSuccessAlert } from '../components/PaymentSuccessAler';

const CartSummary = () => {
  const location = useLocation();
  const token = localStorage.getItem("jwt");
  const currentPoint = localStorage.getItem('point');
  const cart2 = localStorage.getItem('cart2');

  console.log("currentPoint: ", currentPoint);

  const itemCount = localStorage.getItem('totalItems'); // แปลง itemCount เป็น integer
  const { storedCounts, cartItems } = location.state || {};
  const parsedCounts = typeof storedCounts === 'string' ? JSON.parse(storedCounts) : storedCounts;

  const [isOn, setIsOn] = useState(false);
  const [isShowQr, setIsShowQr] = useState(false); // toggle state for QR code
  const [randomString, setRandomString] = useState(''); // Store the random string
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // disable button state after toggling

  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);

  // ฟังก์ชันเปิด/ปิด Modal
  const handleOpenRedeemModal = () => setIsRedeemModalOpen(true);
  const handleCloseRedeemModal = () => setIsRedeemModalOpen(false);

  let totalPointsSum = 0; // Declare total points sum
  let totalCountSum = 0;  // Declare total count sum

  const toggleSwitch = () => {
    if (!isButtonDisabled) {
      setIsOn(!isOn);
      setIsRedeemModalOpen(true); // Open the redeem modal when the toggle is turned on
      setIsButtonDisabled(true); // Disable the button after it's clicked

    }
  };


  const handleConfirm = () => {
    const randomValue = generateRandomString(10); // Generate a 10-character string
    setRandomString(randomValue);
    console.log("Random string:", randomValue);
    console.log("การแลกแต้มสำเร็จ");
    setIsRedeemModalOpen(false); // ปิด Modal หลังจากการยืนยัน
    setIsShowQr(true); // แสดง QR code
    const user = JSON.parse(localStorage.getItem('user'));

    // จัดรูปแบบวันที่และเวลาในรูปแบบ DD/MM/YYYY HH:mm AM/PM
    const now = new Date();
  now.setHours(now.getHours() + 7); // Adjust to Thai time zone (UTC+7)

  const redeemData = {
    customer: user?.id, // แก้ id ให้เป็น id ของลูกค้าที่ล็อกอิน
    totalPoints: totalPointsSum,
    qrCode: randomValue,
    status: "pending",
    // invoice: "1",
    productJsonArray: JSON.stringify(cart2),
    shop: localStorage.getItem('shopId'),
    date: now.toISOString().split('T')[0], // ได้ค่าเฉพาะวันที่ เช่น 16/10/2024
    time: now.toISOString().split('T')[1].split('.')[0] // ได้ค่าเฉพาะเวลา เช่น 12:34 PM
  };
    const payload = {
      data: redeemData // Wrap redeemData inside "data"
    };

    const response = createRedeem(payload, token);
    // if (response.ok)
    const response2 = updateUser(user?.id, { point: currentPoint - totalPointsSum }, token);

    // totalPoints: number;
    // status: string;
    // customer: User;
    // qrCode: string;
    // productJsonArray: JSON;
    console.log("response: ", response);
  };

  const handleQrCodeClick = () => {
    // const canvas = document.querySelector("canvas");
    // if (canvas) {
    //   const qrImageUrl = canvas.toDataURL("image/png"); // Convert QR code to image data URL
    //   const newWindow = window.open();
    //   newWindow.document.write(`<img src="${qrImageUrl}" />`); // Open the image in a new window
    // }
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const qrImageUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = qrImageUrl;
      link.download = "qr-code.png";
      link.click();
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling Modal

  const handleViewQrCode = () => {
    setIsModalOpen(true); // Open the modal
  };

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

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  let index = 0;
  return (
    <>
      <Header />
      <div className="flex justify-center mt-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-md border-2 border-gray-300">
          <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">รายการที่เลือก</h2>
          <div className="border-b-2 border-gray-300 mb-4"></div>
          {itemCount > 0 && (
            <ul className="space-y-3 sm:space-y-4">
              {cartItems.map((item) => {
                const count = parsedCounts[item.id];
                if (count > 0) {
                  const totalPoints = item.point * count;
                  totalPointsSum += totalPoints; // Adding points to total sum
                  totalCountSum += count; // Adding count to total count
                  index += 1;
                  console.log("currentPoint", currentPoint, " totalPointsSum: ", totalPointsSum);
                  return (
                    <li key={item.id} className="flex flex-row justify-between items-start sm:items-center py-4 border-b border-gray-200">
                      <div className="sm:w-full">
                        <span className="font-semibold text-lg sm:text-xl">รายการที่ {index}:</span>
                        <span className="text-md sm:text-lg ml-2">{item.name}</span>
                        <br />
                        <span className="text-sm sm:text-md text-gray-600">จำนวน {count} รายการ</span>
                      </div>
                      {item.point ? (
                        <div className="mt-2 text-md sm:text-lg text-gray-700">
                          <p>ใช้แต้ม</p>
                          <p> {totalPoints} แต้ม</p>
                        </div>
                      ) : (
                        <span className="text-md sm:text-lg text-gray-500">ฟรี</span>
                      )}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          )}
          <div className="border-t-2 border-gray-300 mt-4 pt-4">
            <p className="text-center text-sm font-light">จำนวนทั้งหมด: {totalCountSum} รายการ</p>
            <p className="text-center text-lg font-semibold">แต้มรวมทั้งหมด: {totalPointsSum} แต้ม</p><br />
            {/* <p className="text-center text-sm sm:text-lg text-gray-500 mt-2">ขอบคุณที่ใช้บริการ</p> */}
            {totalPointsSum > currentPoint ? (
              <p className="text-center text-lg font-semibold  text-red-600">แต้มไม่เพียงพอต่อการแลกสินค้า</p>
            ):(
              <p className="text-center text-sm sm:text-lg text-gray-500 mt-2">ขอบคุณที่ใช้บริการ</p>
            )}
          </div>

          {/* QR Code section */}
          {itemCount > 0 && currentPoint >= totalPointsSum &&
            <div>
              <p className="text-center pt-10 text-xl">Click เพื่อสร้าง QR Code สำหรับใช้ตอนรับสินค้า</p>
              <> 
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={toggleSwitch}
                    disabled={isButtonDisabled}
                    style={{ cursor: isButtonDisabled ? 'not-allowed' : 'pointer' }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    สร้าง QR Code
                  </button>
                </div>
              </>

              {isOn && (
                <div>
                  <RedeemPointsModal
                    point={totalPointsSum}
                    isOpen={isRedeemModalOpen}
                    onClose={handleCloseRedeemModal}
                    onConfirm={handleConfirm}
                  />
                  {isShowQr &&
                      <div className="m-5 p-5 flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-md">
                        <div onClick={handleQrCodeClick} className="cursor-pointer bg-white rounded-lg p-6 shadow-lg transition-all hover:shadow-2xl">
                          <QRCode value={randomString} className="rounded-md" /> {/* Generate QR code from random string */}
                        </div>
                        <button
                          onClick={handleViewQrCode}
                          className="mt-4 bg-blue-400 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                          กดเพื่อขยายขนาด QR Code และ Download
                        </button>
                      </div>
                  }
              </div>


              )}
            </div>
          }
        </div>
        {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div className="bg-slate-200 p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-center text-lg text-black font-semibold m-4">QR Code สำหรับใช้ตอนรับสินค้า</h2>
            <div onClick={handleQrCodeClick} className="flex justify-center items-center mt-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <QRCode value={randomString} size={256} className="rounded-md" />
            </div>
            <div className="mt-4 flex space-x-4 justify-center">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={handleCloseModal}
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
      )}
      </div>
    </>
  );
};

export default CartSummary;

