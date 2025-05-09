import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register'); // เปลี่ยนไปที่หน้า Register
  };

  const handleLogin = () => {
    navigate('/login'); // เปลี่ยนไปที่หน้า App
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
        Welcome to Cook Project
      </h1>

      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl leading-relaxed">
        Here’s a platform where you can bring your bottles or cans,
        collect points, and exchange them for exciting rewards from our partner stores. <br />
        It’s not just recycling&mdash;it’s rewarding sustainability
        with endless possibilities!
      </p>

      <div className="flex space-x-6">
        <button
          className="bg-[#FBB615] text-white font-medium py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-200 ease-in-out"
          onClick={handleRegister} // เรียกใช้ฟังก์ชัน handleRegister เมื่อคลิกปุ่ม
        >
          Register
        </button>

        <button
          className="bg-[#15803d] text-white font-medium py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-200 ease-in-out"
          onClick={handleLogin} // เรียกใช้ฟังก์ชัน handleLogin เมื่อคลิกปุ่ม
        >
          Login with Line
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;
