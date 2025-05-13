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
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

        // If not logged in, trigger login
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        // Get user profile from LINE
        const profile = await liff.getProfile();
        const lineId = profile.userId;

        // Store LINE user profile in localStorage
        localStorage.setItem("userId", lineId);
        localStorage.setItem("displayName", profile.displayName);
        localStorage.setItem("pictureUrl", profile.pictureUrl);

        const storedJwt = localStorage.getItem('jwt');
        const storedLineId = localStorage.getItem('userId');

        // ✅ If already logged in, navigate to /home
        if (storedJwt && storedLineId === lineId) {
          console.log("🔐 Already authenticated, redirecting to /home");
          navigate('/home');
          return;
        }

        // 🔐 Not logged in before, try login API
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
