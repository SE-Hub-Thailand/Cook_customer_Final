const LoadingSpinner = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen ">
		{/* Spinner */}
		<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-900 border-opacity-50 border-t-gray-900"></div>
		{/* Loading Text */}
		<p className="text-gray-900 mt-4 text-lg font-semibold">Loading</p>
	  </div>
	);
  };


  export default LoadingSpinner;

