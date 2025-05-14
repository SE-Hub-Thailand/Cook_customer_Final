import { useEffect, useState } from 'react';
import { useLiff } from 'react-liff';
// import axios from 'axios';
import { loginWithLineId } from '../api/business/login'
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import LoadingSpinner from '../components/LoadingSpinner';
import { logInfo, logError, logWarning, getLogs } from '../utils/logger';
// const API_URL = import.meta.env.VITE_API_URL
const Login = () => {
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { error, isLoggedIn, isReady, liff } = useLiff();
  const navigate = useNavigate();

  // Initialize LIFF and login or register the user
  useEffect(() => {
    const initializeLiff = async () => {
      try {
        // Check LIFF authorization status
        if (!liff.isLoggedIn()) {
          logInfo("User not logged in with LINE, triggering login");
          liff.login();
          return;
        }

        logInfo("Attempting to get LINE profile...");
        try {
          const profile = await liff.getProfile();
          logInfo("LINE profile successfully retrieved", {
            userId: profile.userId,
            displayName: profile.displayName
          });

          const lineId = profile.userId;
          logInfo("LINE ID retrieved", { lineId });

          localStorage.setItem('lineId', lineId);
          // Set display name from profile
          setDisplayName(profile.displayName + "xxxx");

          logInfo("Calling loginWithLineId API...");
          try {
            const response = await loginWithLineId(lineId);
            logInfo('API Response received', {
              success: !!response,
              hasJwt: !!response?.jwt,
              hasUser: !!response?.user
            });

            if (!response) {
              // This line is login fail
              logError("Login failed", { lineId });
              logInfo("Redirecting to registration page");
              navigate('/first'); // Redirect to the Register component
            } else {
              // This line is login success
              logInfo("Login successful", {
                userId: response?.user?.id,
                username: response?.user?.username
              });
              logInfo("Redirecting to home page");
              navigate('/'); // Redirect to the App component
            }
          } catch (apiError) {
            logError("API login error", {
              message: apiError.message,
              stack: apiError.stack
            });
            setErrorMessage(`Login API error: ${apiError.message}`);
            setLoading(false);
          }
        } catch (profileError) {
          logError("LINE profile fetch error", {
            message: profileError.message,
            stack: profileError.stack
          });

          if (profileError.message && profileError.message.includes("400")) {
            logError("LINE OAuth token error (400 Bad Request)", { message: profileError.message });
            setErrorMessage("LINE authentication expired. Please login again.");
            // Force LIFF logout and re-login to refresh token
            logInfo("Logging out and re-logging in to refresh token");
            liff.logout();
            setTimeout(() => liff.login(), 1000);
          } else {
            setErrorMessage(`LINE profile error: ${profileError.message}`);
          }
          setLoading(false);
        }
      } catch (err) {
        logError('Initialization or login error', {
          message: err.message,
          stack: err.stack
        });

        // Check if this is a LINE OAuth error
        if (err.message && err.message.includes("https://api.line.me/oauth2/v2.1/token")) {
          logError("LINE OAuth token error detected", { message: err.message });
          setErrorMessage("LINE authentication failed. Please try logging in again.");
          // Force LIFF logout and re-login
          logInfo("Performing logout and re-login sequence");
          liff.logout();
          setTimeout(() => liff.login(), 1000);
        } else {
          setErrorMessage(`Initialization error: ${err.message}`);
        }
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      setLoading(true);
      initializeLiff();
    }
  }, [liff, isLoggedIn, navigate]);

  // Debug function to show logs in UI when needed
  const showDebugLogs = () => {
    const logs = getLogs().slice(0, 10); // Get the 10 most recent logs
    return (
      <div className="debug-logs" style={{ textAlign: 'left', fontSize: '12px', marginTop: '20px' }}>
        <h4>Recent Logs:</h4>
        {logs.map((log, idx) => (
          <div key={idx} style={{
            padding: '5px',
            margin: '2px 0',
            backgroundColor: log.type === 'error' ? '#ffdddd' : '#f0f0f0',
            borderLeft: `3px solid ${log.type === 'error' ? 'red' : 'gray'}`
          }}>
            <span style={{ color: 'gray' }}>{new Date(log.timestamp).toLocaleTimeString()}</span> -
            <strong>{log.type.toUpperCase()}:</strong> {log.message}
          </div>
        ))}
      </div>
    );
  };

  // Render the login/logout buttons and display name
  const showDisplayName = () => {
    if (!isReady) return <LoadingSpinner />;

    if (!isLoggedIn) {
      return (
        liff.login()
      );
    }

    return (
      <>
        <p>Welcome, {displayName}!</p>
        <button className="App-button" onClick={() => { liff.logout(); setDisplayName(''); }}>
          Logout
        </button>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading ? <LoadingSpinner /> : showDisplayName()}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {showDebugLogs()} {/* Show debug logs in UI */}
      </header>
    </div>
  );
};

export default Login;
