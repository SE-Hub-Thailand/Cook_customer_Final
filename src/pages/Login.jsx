import { useEffect, useState } from 'react';
import { useLiff } from 'react-liff';
// import axios from 'axios';
import { loginWithLineId } from '../api/business/login'
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import LoadingSpinner from '../components/LoadingSpinner';
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
        const profile = await liff.getProfile();
        const lineId = profile.userId;
        console.log("lineId", lineId);
        console.log("profile lineID", profile.displayName);
        console.log("profile lineID", profile.lineId);
        localStorage.setItem('userId', lineId);
        // Set display name from profile
        setDisplayName(profile.displayName + "xxxx");
        const response = await loginWithLineId(lineId);
        console.log('user: ', response.user);
        console.log('jwt: ', response.jwt);
        if(!response){
          // This line is login fail
          // This line we will redirect to sign up page
          console.log("Login failed. Redirecting to sign up page...");
          navigate('/first'); // Redirect to the Register component

        }else{
          // This line is login success
          console.log("Login successful. Redirecting to app...");
          navigate('/'); // Redirect to the App component
        }
      } catch (err) {
        console.error('Initialization or login error:', err);
        setErrorMessage('Initialization or login error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      setLoading(true);
      initializeLiff();
    }
  }, [liff, isLoggedIn]);


  // Render the login/logout buttons and display name
  const showDisplayName = () => {
    // if (error) return <p>Something went wrong: {error.message}</p>;
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
      </header>
    </div>
  );
};

export default Login;
