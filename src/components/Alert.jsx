import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Alert = ({ title, message, path, status }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (showModal) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
	console.log("path: ", typeof path);
	if (path == 0) {
	  navigate(0);
	}
	if (path) {
      navigate(path);
    }
	// else {
	//   navigate(window.location.pathname);
    // }
  };

  const isSuccess = status === 'success';
  const iconColor = isSuccess ? 'text-green-500' : 'text-red-500';
  const borderColor = isSuccess ? 'border-green-500' : 'border-red-500';
  const textColor = isSuccess ? 'text-green-600' : 'text-red-600';
  const buttonColor = isSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-auto border-t-4 ${borderColor}`}>
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className="py-1">
                  {isSuccess ? (
                    <svg
                      className={`fill-current h-6 w-6 ${iconColor} mr-4`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15.27l5.18-5.18a1 1 0 0 0-1.42-1.42L10 12.43l-2.76-2.76a1 1 0 0 0-1.42 1.42L10 15.27z" />
                    </svg>
                  ) : (
                    <svg
                      className={`fill-current h-6 w-6 ${iconColor} mr-4`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className={`font-bold ${textColor} text-lg`}>{title}</p>
                  <p className="text-gray-700 mt-2">{message}</p>
                </div>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <svg
                  className="fill-current h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10 3.636 5.05l1.414-1.414L10 8.586z" />
                </svg>
              </button>
            </div>
            <button
              onClick={closeModal}
              className={`mt-4 w-full ${buttonColor} text-white py-2 rounded transition duration-200`}
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  path: PropTypes.string,
  status: PropTypes.oneOf(['success', 'fail']), // กำหนดให้ status เป็น 'success' หรือ 'fail'
};

Alert.defaultProps = {
  path: '',
  status: 'fail', // ค่า default เป็น fail
};

export default Alert;
