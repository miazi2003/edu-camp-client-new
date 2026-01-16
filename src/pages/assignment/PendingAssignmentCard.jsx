import React from "react";
import { Link } from "react-router-dom"; // Fixed import for web
import { FaUserCircle } from "react-icons/fa";
import { MdAssignment, MdGrade } from "react-icons/md";

const PendingAssignmentCard = ({ pending, handleMarkAssignment, handleSetDifficulty }) => {
  const { _id, title, marks, difficulty, thumbnailImageURL, submittedBy, status } = pending || {};

  // Helper for Difficulty Color
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "easy": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="card bg-white w-full shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-100 flex flex-col h-full group">
      
      {/* --- Image Section --- */}
      <figure className="relative h-48 w-full overflow-hidden">
        <img
          src={thumbnailImageURL}
          alt={title || "Assignment"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Status Badge (Overlay) */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-sm uppercase tracking-wide flex items-center gap-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          {status || "Pending"}
        </div>
      </figure>

      {/* --- Body Section --- */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Difficulty (Clickable Badge) */}
          <button 
            onClick={() => handleSetDifficulty(pending)}
            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border mb-3 hover:opacity-80 transition-opacity ${getDifficultyColor(difficulty)}`}
            title="Click to change difficulty"
          >
            {difficulty || "Set Difficulty"}
          </button>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1" title={title}>
            {title || "Untitled Assignment"}
          </h2>

          {/* Marks Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded-lg w-fit">
            <MdGrade className="text-orange-500" size={18} />
            <span className="font-medium">Marks:</span>
            <span className="font-bold text-gray-900">{marks ?? 100}</span>
          </div>

          {/* Submitter Info */}
          <div className="flex items-center gap-3 mb-4 p-2 border border-gray-100 rounded-lg">
            <div className="text-gray-400">
               <FaUserCircle size={28} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-gray-500 font-semibold uppercase">Submitted By</p>
              <p className="text-sm text-gray-700 truncate" title={submittedBy}>
                {submittedBy || "Unknown User"}
              </p>
            </div>
          </div>
        </div>

        {/* --- Action Button --- */}
        <div className="mt-2">
          <Link to={`/giveMarks/${_id}`} className="w-full">
            <button
              onClick={() => handleMarkAssignment && handleMarkAssignment(pending)}
              className="btn w-full bg-green-700 hover:bg-green-800 text-white border-none flex items-center gap-2 text-base shadow-md hover:shadow-lg transition-all"
            >
              <MdAssignment />
              Give Marks
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PendingAssignmentCard;