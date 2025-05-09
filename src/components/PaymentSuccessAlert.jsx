import React from 'react';

const PaymentSuccessAlert = ({ onClose, onGoToDashboard }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 text-center">

        {/* Close button in the top-right corner */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="flex justify-center items-center mb-4">
          <div className="bg-green-100 rounded-full p-2">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m0 0a9 9 0 11-7.618-4.663A9 9 0 0112 21v0"></path>
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">Payment successful</h2>
        <p className="text-gray-500 mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.</p>

        <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700" onClick={onGoToDashboard}>
          Go back to dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessAlert;
