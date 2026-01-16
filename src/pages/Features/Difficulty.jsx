import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const Difficulty = () => {
  const axiosSecure = useAxiosSecure();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/createAssignmentAll")
      .then((res) => {
        setAssignments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleSearch = (value) => {
    setLoading(true);
    axiosSecure
      .get(`/searchAssignment?search=${value}`)
      .then((res) => {
        setAssignments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'normal': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'hard': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Browse Assignments by Difficulty
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find assignments that match your skill level and learning pace
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-10">
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-4 text-center">
              Filter assignments by your preferred difficulty level
            </p>
            <div className="relative">
              <select
                className="w-full md:w-80 px-6 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer shadow-sm"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              >
                <option value="" className="text-gray-500">Filter by Difficulty</option>
                <option value="Easy" className="text-emerald-600">Easy</option>
                <option value="Normal" className="text-blue-600">Normal</option>
                <option value="Hard" className="text-rose-600">Hard</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading assignments...</p>
          </div>
        )}

        {/* Assignments Grid */}
        {!loading && assignments.length > 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {assignments.map((assignment) => {
              const difficultyColor = getDifficultyColor(assignment.difficulty);
              
              return (
                <div 
                  key={assignment._id} 
                  className="group relative overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={assignment.thumbnailImageURL} 
                      alt={assignment.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Header with difficulty badge and link */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${difficultyColor}`}>
                        {assignment.difficulty || 'Medium'}
                      </span>
                      <Link to={`/viewAssignments/${assignment._id}`}>
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:gap-2 transition-all duration-200">
                          View Details
                          <FaLongArrowAltRight className="w-3 h-3" />
                        </button>
                      </Link>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {assignment.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {assignment.description}
                    </p>

                    {/* Marks */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center border border-blue-100">
                          <span className="text-blue-600 font-bold">📝</span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">
                            {assignment.marks === 100 ? assignment.marks : 100} Marks
                          </div>
                          <div className="text-xs text-gray-500">Total points</div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link to={`/viewAssignments/${assignment._id}`}>
                      <button className="w-full mt-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-cyan-600">
                        Start Assignment
                      </button>
                    </Link>
                  </div>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-xl transition-all duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        ) : !loading && assignments.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center border border-gray-200">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Assignments Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try selecting a different difficulty level or check back later for new assignments.
            </p>
            <button
              onClick={() => handleSearch("")}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              View All Assignments
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Difficulty;