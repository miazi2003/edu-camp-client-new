import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { MdAssignmentTurnedIn, MdPendingActions, MdCheckCircle } from "react-icons/md";

const MySubmittedAssignment = () => {
  const axiosSecure = UseAxiosSecure();
  const [submit, setSubmit] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  useEffect(() => {
    if (email) {
      setLoading(true);
      axiosSecure
        .get(`/submittedAssignment?email=${email}`, { withCredentials: true })
        .then((res) => {
          setSubmit(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    }
  }, [email, axiosSecure]);

  // Helper for Difficulty Color
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "easy": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Helper for Status Color
  const getStatusColor = (status) => {
    return status === "pending" 
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : "bg-green-100 text-green-800 border-green-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm py-10 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Submissions
          </h1>
          <p className="text-gray-500">
            Track the status and results of your submitted assignments.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {submit.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center opacity-70">
            <MdAssignmentTurnedIn size={80} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-600">No Submissions Yet</h2>
            <p className="text-gray-500">You haven't submitted any assignments yet.</p>
          </div>
        ) : (
          // Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {submit.map((sub) => (
              <div
                key={sub._id} // Added Key
                className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-100 flex flex-col h-full"
              >
                {/* Image Section */}
                <figure className="relative h-48 w-full overflow-hidden">
                  <img
                    src={sub.thumbnailImageURL}
                    alt={sub.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Status Badge (Top Right) */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border shadow-sm uppercase tracking-wide flex items-center gap-1 ${getStatusColor(sub.status)}`}>
                    {sub.status === 'pending' ? <MdPendingActions /> : <MdCheckCircle />}
                    {sub.status}
                  </div>
                </figure>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  
                  {/* Title & Difficulty */}
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-bold text-gray-800 line-clamp-1" title={sub.title}>
                      {sub.title}
                    </h2>
                  </div>
                  
                  <span className={`w-fit px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider mb-3 ${getDifficultyColor(sub.difficulty)}`}>
                      {sub.difficulty}
                  </span>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    {sub.description}
                  </p>

                  <div className="divider my-1"></div>

                  {/* Marks Section */}
                  <div className="flex justify-between items-center text-sm font-medium text-gray-600 mb-4">
                    <span>Total Marks:</span>
                    <span className="text-gray-900 font-bold">{sub.marks}</span>
                  </div>

                  {/* --- Feedback / Result Section --- */}
                  {sub.status === 'pending' ? (
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-center">
                      <p className="text-yellow-700 text-sm font-medium flex items-center justify-center gap-2">
                        <span className="loading loading-dots loading-xs"></span>
                        Waiting for instructor
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-green-800 text-xs font-bold uppercase">Obtained Marks</span>
                        <span className="text-green-700 font-extrabold text-lg">
                           {sub.resultMark} <span className="text-xs text-green-500 font-normal">/ {sub.marks}</span>
                        </span>
                      </div>
                      <div className="bg-white/60 p-2 rounded text-xs text-green-800 italic">
                        "{sub.feedback}"
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmittedAssignment;