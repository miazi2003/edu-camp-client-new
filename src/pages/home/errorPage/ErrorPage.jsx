import React from 'react';
import { Link } from "react-router"
import Lottie from 'lottie-react';
import errorLogo from "../../../assets/lottie/error.json";

const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className="w-64 h-64">
        <Lottie animationData={errorLogo} autoPlay={true} loop={true} />
      </div>
      <Link to={'/'}>
        <button className="btn bg-green-800 mt-4 text-white hover:bg-white hover:text-green-800 hover:border-green-800">
          Back To Home Now
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
