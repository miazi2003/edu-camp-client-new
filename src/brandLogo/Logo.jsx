import React from 'react';
import { Link } from 'react-router';
import logo from "../assets/logo.png"
const Logo = () => {
  return (
   <Link to={"/"}>
    <div className="flex items-center space-x-2">
      <div className=" p-2 rounded-full">
    <img className='w-12 h-12' src={logo} alt="" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 textWhite">EduCamp</h1>
    </div></Link>
  );
};

export default Logo;
