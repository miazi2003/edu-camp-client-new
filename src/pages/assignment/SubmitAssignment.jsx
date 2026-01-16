import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Use react-router-dom
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { FaGoogleDrive, FaRegCommentDots, FaArrowLeft } from "react-icons/fa";

const SubmitAssignment = () => {
  const axiosSecure = UseAxiosSecure();
  const [assignment, setAssignment] = useState(null); // Init as null
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const email = user?.email;
  const displayName = user?.displayName; // Get user name for submission record

  // Fetch Assignment Details
  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/viewAssignment/${id}`) // Use relative path with axiosSecure
      .then((res) => {
        setAssignment(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load assignment details");
        setLoading(false);
      });
  }, [id, axiosSecure]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const doc = form.doc.value;
    const note = form.note.value;

    const newSubmit = {
      doc,
      note,
      email: email,
      submittedBy: displayName, // Useful to show who submitted it
      assignmentId: id,
      status: "pending",
      title: assignment.title,
      marks: assignment.marks,
      difficulty: assignment.difficulty,
      thumbnailImageURL: assignment.thumbnailImageURL,
      resultMark: "not given",
      feedback: "not given",
    };

    axiosSecure
      .post(`/submittedAssignment`, newSubmit, { withCredentials: true })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Assignment Submitted Successfully!");
          navigate("/attemptedAssignment"); // Redirect to "My Submissions" usually makes more sense
        }
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          toast.error("You have already submitted this assignment.");
        } else {
          console.error(err.message);
          toast.error("Submission failed. Please try again.");
        }
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* --- Left Side: Assignment Preview --- */}
        <div className="md:w-5/12 bg-green-50 p-8 flex flex-col justify-center border-r border-gray-100">
          <h3 className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-2">
            You are submitting to
          </h3>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {assignment?.title}
          </h2>
          
          <div className="rounded-xl overflow-hidden shadow-md mb-6 h-48 w-full">
             <img 
               src={assignment?.thumbnailImageURL} 
               alt={assignment?.title} 
               className="w-full h-full object-cover"
             />
          </div>

          <div className="space-y-2 text-sm text-gray-600">
             <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Total Marks:</span>
                <span className="font-bold text-gray-900">{assignment?.marks}</span>
             </div>
             <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Difficulty:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    assignment?.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
                    assignment?.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                }`}>
                    {assignment?.difficulty}
                </span>
             </div>
          </div>
          
          <button 
            onClick={() => navigate(-1)}
            className="mt-8 flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors text-sm font-medium"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>

        {/* --- Right Side: Submission Form --- */}
        <div className="md:w-7/12 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Submit Work
          </h1>
          <p className="text-gray-500 mb-8">
            Attach your Google Doc link and add a quick note for the instructor.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Google Doc Input */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaGoogleDrive className="text-green-600" />
                Google Doc Link
              </label>
              <input
                type="url"
                name="doc"
                placeholder="https://docs.google.com/document/d/..."
                className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all"
                required
              />
            </div>

            {/* Note Input */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaRegCommentDots className="text-blue-500" />
                Quick Note
              </label>
              <textarea
                name="note"
                rows="4"
                placeholder="Describe your submission or ask a question..."
                className="textarea textarea-bordered w-full bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all resize-none text-base"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-green-700 hover:bg-green-800 text-white border-none shadow-md hover:shadow-lg transition-all text-lg mt-4"
            >
              Submit Assignment
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default SubmitAssignment;