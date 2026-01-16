import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Use react-router-dom for web
import moment from "moment";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { IoMdStar, IoMdArrowBack } from "react-icons/io";
import { FaCalendarAlt, FaLayerGroup, FaCheckCircle } from "react-icons/fa";

const ViewAssignment = () => {
  const axiosSecure = UseAxiosSecure();
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/viewAssignment/${id}`)
      .then((res) => {
        setViewData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (!viewData) return <div className="text-center mt-20">Assignment not found.</div>;

  const {
    description,
    difficulty,
    dueDate,
    marks,
    thumbnailImageURL,
    title,
    _id,
  } = viewData;

  // Date Logic
  const date = moment(dueDate);
  const today = moment();
  const daysLeft = date.diff(today, "days");
  const isExpired = daysLeft < 0;

  // Helper for Difficulty Color
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "easy": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      
      {/* Main Card */}
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* --- LEFT: Image Section --- */}
        <div className="lg:w-1/2 relative h-[400px] lg:h-auto bg-gray-100 group">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={thumbnailImageURL}
            alt={title}
          />
          
          {/* Back Button (Floating) */}
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/90 p-2 rounded-full hover:bg-white text-gray-700 shadow-lg transition-all"
            title="Go Back"
          >
            <IoMdArrowBack size={24} />
          </button>

          {/* Floating Marks Badge */}
          <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-gray-100">
             <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Total Marks</p>
             <p className="text-3xl font-extrabold text-green-700">{marks}</p>
          </div>
        </div>

        {/* --- RIGHT: Details Section --- */}
        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* Difficulty Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>

            {/* Date Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider flex items-center gap-1
              ${isExpired ? "bg-red-50 text-red-600 border-red-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}>
              <FaCalendarAlt />
              {isExpired ? "Expired" : `${daysLeft} Days Left`}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <div className="prose max-w-none text-gray-600 mb-8 whitespace-pre-line">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description:</h3>
            {description}
          </div>

          {/* Meta Data Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">Due Date</p>
                <p className="text-gray-800 font-medium flex items-center gap-2">
                   {moment(dueDate).format("MMM Do, YYYY")}
                </p>
             </div>
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-400 text-xs font-bold uppercase mb-1">User Rating</p>
                <div className="flex text-yellow-400 text-lg">
                   <IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar />
                </div>
             </div>
          </div>

          {/* ID (Small) */}
          <p className="text-xs text-gray-300 mb-6 font-mono">Assignment ID: {_id}</p>

          {/* Action Button */}
          <Link to={`/submitAssignment/${_id}`} className="w-full">
            <button 
              className={`btn w-full text-lg h-14 border-none shadow-md hover:shadow-xl transition-all
              ${isExpired 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-green-700 hover:bg-green-800 text-white"}`}
              disabled={isExpired}
            >
              {isExpired ? "Deadline Passed" : "Take Assignment"}
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ViewAssignment;