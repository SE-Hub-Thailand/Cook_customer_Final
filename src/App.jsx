import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import './App.css';
import { loginWithLineId } from './api/business/login';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // ✅ STEP 1: เคย login มาก่อน → เด้งเข้า /home เลย
        const storedJwt = localStorage.getItem('jwt');
        const storedLineId = localStorage.getItem('userId');

        if (storedJwt && storedLineId) {
          console.log("✅ Found existing login, redirecting to /home");
          navigate('/home');
          return;
        }

        // ✅ STEP 2: เริ่ม LINE LIFF
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

        if (!liff.isLoggedIn()) {
          liff.login(); // ไปหน้า login ของ LINE
          return;
        }

        // ✅ STEP 3: ดึงโปรไฟล์ LINE
        const profile = await liff.getProfile();
        const lineId = profile.userId;

        // เก็บโปรไฟล์
        localStorage.setItem('userId', lineId);
        localStorage.setItem('displayName', profile.displayName);
        localStorage.setItem('pictureUrl', profile.pictureUrl);

        // 🔐 เช็คว่าเคยลงทะเบียนไว้ในระบบหรือยัง
        const loginRes = await loginWithLineId(lineId);

        if (loginRes && loginRes.jwt) {
          localStorage.setItem('jwt', loginRes.jwt);
          console.log("✅ Login success, redirecting to /home");
          navigate('/home');
        } else {
          console.log("⚠️ User not found, redirecting to /register");
          navigate('/register');
        }

      } catch (error) {
        console.error("🚨 LINE Auth Error:", error);
        setErrorMessage('เกิดข้อผิดพลาดในการยืนยันตัวตน กรุณาลองใหม่');
      } finally {
        setLoading(false);
      }
    };

    handleAuth();
  }, [navigate]);

  if (loading) return <LoadingSpinner />;
  if (errorMessage) return <div className="text-red-500 text-center mt-10">{errorMessage}</div>;

  return <div className="App"></div>;
};

export default App;
