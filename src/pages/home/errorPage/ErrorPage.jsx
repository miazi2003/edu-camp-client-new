import React from 'react';
import { Link } from "react-router-dom"; // Use react-router-dom
import Lottie from 'lottie-react';
import errorLogo from "../../../assets/lottie/error.json";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        
        {/* Lottie Animation */}
        <div className="w-64 h-64 mx-auto mb-6">
          <Lottie animationData={errorLogo} autoPlay={true} loop={true} />
        </div>

        {/* Error Text */}
        <h1 className="text-6xl font-extrabold text-green-800 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          Oops! It seems like the page you are trying to access doesn't exist or has been moved.
        </p>

        {/* Home Button */}
        <Link to={'/'}>
          <button className="btn bg-green-700 hover:bg-green-800 text-white border-none px-8 h-12 text-lg shadow-lg hover:shadow-green-500/30 transition-all rounded-full flex items-center gap-2 mx-auto">
            <FaHome />
            Back to Home
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default ErrorPage;