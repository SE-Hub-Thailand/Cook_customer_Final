import React, { useEffect, useState } from 'react';
import { useLiff } from 'react-liff';
import './App.css';
import { loginWithLineId } from './api/business/login'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import { logInfo, logError, logDebug } from './utils/logger';
// import Home from './pages/Home';

const LiffCustomer = import.meta.env.VITE_LIFF_ID;

const App = () => {
    const navigate = useNavigate();
    const { liff, error } = useLiff();
    const [loading, setLoading] = useState(true);
    // const [displayName, setDisplayName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const initializeLiff = async () => {
            try {
                // Check if liff is defined and has the init function
                if (typeof liff === 'undefined') {
                    logError("LIFF is undefined. Check if SDK is loaded correctly.");
                    setErrorMessage("LIFF is not loaded. Please refresh the page.");
                    setLoading(false);
                    return;
                }

                // Verify the liff.init method exists
                if (typeof liff.init !== 'function') {
                    logError("LIFF init method is not a function.");
                    // setErrorMessage("LIFF is not initialized correctly. Please try again.");
                    setLoading(false);
                    return;
                }

                // Initialize LIFF
                logInfo("Initializing LIFF with ID: " + LiffCustomer);
                try {
                    await liff.init({ liffId: LiffCustomer });
                    logInfo("LIFF initialized successfully");
                } catch (initError) {
                    logError("LIFF initialization error", initError);
                    if (initError.message && initError.message.includes("https://api.line.me/oauth2/v2.1/token")) {
                        logError("LINE OAuth token error during initialization", { message: initError.message });
                        setErrorMessage("LINE authentication failed. Please try again.");
                        setLoading(false);
                        return;
                    }
                    throw initError;
                }

                if (liff.isLoggedIn()) {
                    logInfo("User is logged in with LINE, getting profile...");
                    try {
                        const profile = await liff.getProfile();
                        const lineId = profile.userId;
                        logInfo("LINE profile retrieved", { 
                            lineId: lineId,
                            displayName: profile.displayName,
                            pictureUrl: profile.pictureUrl?.substring(0, 30) + '...' // Truncate for privacy
                        });
                        
                        localStorage.setItem('displayName', profile.displayName);
                        localStorage.setItem('pictureUrl', profile.pictureUrl);
                        localStorage.setItem('lineId', lineId);

                        logInfo("Calling loginWithLineId API...");
                        try {
                            const response = await loginWithLineId(lineId);
                            logInfo("API Response received", { 
                                success: !!response,
                                hasJwt: !!response?.jwt,
                                hasUser: !!response?.user 
                            });

                            if (!response) {
                                // Login failed
                                logError("Login failed", { lineId });
                                logInfo("Redirecting to registration page");
                                navigate('/register');
                            } else {
                                const token = response.jwt;
                                localStorage.setItem('token', token);
                                logInfo("Login successful, JWT saved to localStorage");
                                logInfo("Redirecting to home page");
                                navigate('/home');
                            }
                        } catch (apiError) {
                            logError("API login error", { 
                                message: apiError.message, 
                                stack: apiError.stack 
                            });
                            setErrorMessage(`Login failed: ${apiError.message}`);
                            setLoading(false);
                        }
                    } catch (profileError) {
                        logError("Error getting LINE profile", { 
                            message: profileError.message, 
                            stack: profileError.stack 
                        });
                        
                        if (profileError.message && profileError.message.includes("400")) {
                            logError("LINE OAuth token error (400 Bad Request)", { message: profileError.message });
                            setErrorMessage("LINE session expired. Please login again.");
                            // Force LIFF logout and re-login
                            logInfo("Logging out and re-logging in to refresh token");
                            liff.logout();
                            setTimeout(() => liff.login(), 1000);
                        } else {
                            setErrorMessage(`Error getting LINE profile: ${profileError.message}`);
                        }
                        setLoading(false);
                    }
                } else {
                    logInfo("User not logged in with LINE. Redirecting to login...");
                    liff.login();
                }
            } catch (generalError) {
                logError('General initialization error', { 
                    message: generalError.message, 
                    stack: generalError.stack 
                });
                
                if (generalError.message && generalError.message.includes("https://api.line.me/oauth2/v2.1/token")) {
                    logError("LINE OAuth token error detected", { message: generalError.message });
                    setErrorMessage("LINE authentication failed. Please try logging in again.");
                    if (liff && typeof liff.logout === 'function') {
                        logInfo("Performing logout and re-login sequence");
                        liff.logout();
                        setTimeout(() => liff.login(), 1000);
                    }
                } else {
                    setErrorMessage(`Initialization error: ${generalError.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        initializeLiff();
    }, [liff, navigate]);

    if (loading) {
        return <div className="App"><LoadingSpinner /></div>;
    }

    if (error) {
        logError("LIFF error from useLiff hook", { message: error.message });
        return <div className="App"><p>Something went wrong: {error.message}</p></div>;
    }

    return (
        <div className="App">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default App;
