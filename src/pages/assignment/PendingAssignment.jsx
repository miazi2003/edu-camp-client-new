import React, { useEffect, useState } from "react";
import PendingAssignmentCard from "./PendingAssignmentCard";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { MdOutlineTaskAlt } from "react-icons/md"; // Icon for empty state

const PendingAssignment = () => {
  const axiosSecure = UseAxiosSecure();
  const [pendingData, setPendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const status = "pending";

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/pendingAssignment?status=${status}`)
      .then((res) => {
        setPendingData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // --- Loading View ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* --- Page Header --- */}
      <div className="bg-white shadow-sm py-10 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Pending Assignments
            {pendingData.length > 0 && (
              <span className="ml-3 text-2xl text-white bg-red-500 px-3 py-1 rounded-full align-middle">
                {pendingData.length}
              </span>
            )}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto mt-2">
            Review and mark assignments submitted by students. 
            Help them grow by providing constructive feedback.
          </p>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="container mx-auto px-4">
        {pendingData.length === 0 ? (
          // --- Empty State (All caught up) ---
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="bg-green-100 p-6 rounded-full mb-4">
              <MdOutlineTaskAlt className="text-6xl text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700">All Caught Up!</h3>
            <p className="text-gray-500 mt-2">
              There are no pending assignments to review right now.
            </p>
          </div>
        ) : (
          // --- Grid View ---
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pendingData.map((pending) => (
              <PendingAssignmentCard 
                key={pending._id} 
                pending={pending} 
                // Pass a refresh function if you want the card to vanish 
                // immediately after grading (optional)
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingAssignment;