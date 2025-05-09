import React, { useState } from "react";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import QRCode from "qrcode.react";
export default function Conclusion() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <div className="w-full height-bg bg-grey-bg mt-10 rounded-s-md">
          <p className="text-center pt-10 text-2xl">รายการที่เลือก</p>

          <div className="grid grid-cols-4 mt-10">
            <p className="relative left-14">1</p>
            <p>บรอคโคลี</p>
            <p className="relative left-14">1</p>
            <p>รายการ</p>
          </div>
          <div className="grid grid-cols-4 mt-10">
            <p className="relative left-14"></p>
            <p>ใช้แต้มไป</p>
            <p className="relative left-14">70</p>
            <p>แต้ม</p>
          </div>

          <div className="grid grid-cols-4 mt-10">
            <p className="relative left-14">2</p>
            <p>แตงกวา</p>
            <p className="relative left-14">2</p>
            <p>รายการ</p>
          </div>

          <div className="grid grid-cols-4 mt-10">
            <p className="relative left-14"></p>
            <p>ใช้แต้มไป</p>
            <p className="relative left-14">160</p>
            <p>แต้ม</p>
          </div>

          <div className="grid grid-cols-4 mt-10">
            <p className="relative left-14">รวมทั้งหมด</p>
            <p></p>
            <p className="relative left-14">230</p>
            <p>แต้ม</p>
          </div>
          <div className="h-10"></div>
        </div>
        
        <p className="text-center pt-10 text-2xl">สร้าง QR Code</p>
        <div className="mt-10 flex justify-center">
          <div
            className={`slider-container ${isOn ? "on" : ""}`}
            onClick={toggleSwitch}
          >
            <div className="slider">
              <div className="slider-button"></div>
            </div>
          </div>
        </div>
        {isOn && (
          <div className="mt-10 flex justify-center">
            <QRCode value="https://google.com" />
          </div>
        )}
      </Container>
    </>
  );
}
