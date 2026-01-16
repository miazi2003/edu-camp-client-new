import React from "react";
import { MdDelete, MdOutlineRemoveRedEye, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom"; // Use react-router-dom for web

const AssignmentCard = ({ assignment, handleDelete }) => {
  const { title, description, marks, difficulty, thumbnailImageURL, _id } = assignment;

  // Helper to determine badge color based on difficulty
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="card bg-white w-full shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-100 group">
      
      {/* --- Image Section --- */}
      <figure className="relative h-48 w-full overflow-hidden">
        <img
          src={thumbnailImageURL}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Difficulty Badge (Floating) */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(difficulty)} shadow-sm uppercase tracking-wide`}>
          {difficulty}
        </div>
      </figure>

      {/* --- Body Section --- */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1" title={title}>
          {title}
        </h2>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Marks Info */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-4 bg-gray-50 p-2 rounded-lg w-fit">
          <span className="text-green-700">Total Marks:</span>
          <span className="text-gray-900 font-bold">{marks}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2"></div>

        {/* --- Action Buttons Footer --- */}
        <div className="flex items-center justify-between pt-2">
          
          {/* View Details (Primary Action) */}
          <Link to={`/viewAssignments/${_id}`}>
            <button className="flex items-center gap-2 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm">
              <MdOutlineRemoveRedEye size={18} />
              View
            </button>
          </Link>

          {/* Edit & Delete (Secondary Actions) */}
          <div className="flex items-center gap-2">
            <Link to={`/updateAssignment/${_id}`}>
              <button
                title="Edit Assignment"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <MdEdit size={22} />
              </button>
            </Link>

            <button
              onClick={() => handleDelete(_id)}
              title="Delete Assignment"
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <MdDelete size={22} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;