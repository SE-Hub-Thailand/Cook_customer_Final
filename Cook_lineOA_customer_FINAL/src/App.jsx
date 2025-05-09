import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import './App.css';
import { loginWithLineId } from './api/business/login';
import { registerUserWithImage as registerUser } from './api/business/register';
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

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        const lineId = profile.userId;
    
        localStorage.setItem("userId", profile.userId);
        localStorage.setItem("displayName", profile.displayName);
        localStorage.setItem('pictureUrl', profile.pictureUrl);

        console.log("profile displayName", profile.displayName);
        console.log("profile userID", profile.userId);
        console.log("profile pictureUrl", profile.pictureUrl);
        
        // const storedJwt = localStorage.getItem('jwt');
        const storedLineId = localStorage.getItem('userId');
        console.log("storedLineId", storedLineId);

        // if (storedJwt && storedLineId === lineId) {
        //   console.log("storedJwt", storedJwt);
        //   console.log("🔐 Already logged in, redirecting to /home");
        //   navigate('/home');
        //   setLoading(false);
        //   return;
        // }

        const loginRes = await loginWithLineId(lineId);
        if (loginRes) {
          localStorage.setItem('jwt', loginRes.jwt);
          localStorage.setItem('userId', lineId);

          console.log("jwt", loginRes.jwt);
          console.log("lineId", lineId);
          console.log("✅ Login successful, redirecting to /home");
          navigate('/home');
        } else {
          console.log("⚠️ Not registered, redirecting to /register");
          navigate('/register');
        }

        setLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        setErrorMessage('Authentication failed.');
        setLoading(false);
      }
    };

    handleAuth();
  }, [navigate]);

  if (loading) return <LoadingSpinner />;
  if (errorMessage) return <div>{errorMessage}</div>;

  return <div className="App"></div>;
};

export default App;
