import Header from "../../components/partner/Header";
import React, { useState } from "react";
import Container from "@mui/material/Container";
export default function ConfirmOrder() {
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
        <p className="text-center pt-10 text-2xl">ยืนยันการส่งสินค้า</p>
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
        
      </Container>
    </>
  );
}
