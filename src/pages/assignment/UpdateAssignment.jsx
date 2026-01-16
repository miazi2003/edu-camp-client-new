import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import formLottie from "../../assets/lottie/forms.json";
import { useNavigate, useParams } from "react-router-dom"; // Use react-router-dom
import toast from "react-hot-toast";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCalendarAlt, FaLayerGroup, FaImage, FaEdit } from "react-icons/fa";

const UpdateAssignment = () => {
  const axiosSecure = UseAxiosSecure();
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/updateAllAssignment/${id}`) // Use relative path
      .then((res) => {
        setViewData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch assignment data");
        setLoading(false);
      });
  }, [id, axiosSecure]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedAssignment = Object.fromEntries(formData.entries());

    // Basic Validation
    if (updatedAssignment.marks < 0 || updatedAssignment.marks > 100) {
        return toast.error("Marks must be between 0 and 100");
    }

    axiosSecure
      .put(`/updateAssignment/${id}`, updatedAssignment)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Assignment Updated Successfully");
          navigate("/assignments");
        } else {
            toast.success("No changes made");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  // Helper to format date for input (YYYY-MM-DD)
  const defaultDate = viewData?.dueDate ? new Date(viewData.dueDate).toISOString().split('T')[0] : '';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col-reverse lg:flex-row">
        
        {/* --- Left Side: Form Section --- */}
        <div className="w-full lg:w-3/5 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FaEdit className="text-green-700" />
              Update Assignment
            </h1>
            <p className="text-gray-500 mt-2">
              Modify the details below to update the assignment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Title & Marks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-semibold text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={viewData.title}
                  placeholder="Assignment Title"
                  className="input input-bordered w-full focus:border-green-600 focus:ring-1 focus:ring-green-600 bg-gray-50 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-700">Marks (0-100)</label>
                <input
                  type="number"
                  name="marks"
                  defaultValue={viewData.marks}
                  placeholder="100"
                  min="0"
                  max="100"
                  className="input input-bordered w-full focus:border-green-600 focus:ring-1 focus:ring-green-600 bg-gray-50 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Row 2: Difficulty & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-semibold text-gray-700 flex items-center gap-2">
                   <FaLayerGroup className="text-gray-400"/> Difficulty
                </label>
                <select
                  name="difficulty"
                  defaultValue={viewData.difficulty}
                  className="select select-bordered w-full focus:border-green-600 focus:ring-1 focus:ring-green-600 bg-gray-50 focus:bg-white transition-all"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-700 flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400"/> Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  defaultValue={defaultDate}
                  className="input input-bordered w-full focus:border-green-600 focus:ring-1 focus:ring-green-600 bg-gray-50 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Row 3: Thumbnail */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700 flex items-center gap-2">
                <FaImage className="text-gray-400"/> Thumbnail URL
              </label>
              <input
                type="url"
                name="thumbnailImageURL"
                defaultValue={viewData.thumbnailImageURL}
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full focus:border-green-600 focus:ring-1 focus:ring-green-600 bg-gray-50 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Row 4: Description */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">Description</label>
              <textarea
                name="description"
                defaultValue={viewData.description}
                placeholder="Write a detailed description of the assignment..."
                rows="5"
                className="textarea textarea-bordered w-full focus:border-green-600 focus:ring-1 focus:ring-green-600 bg-gray-50 focus:bg-white transition-all resize-none text-base"
                required
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="btn flex-1 bg-green-700 hover:bg-green-800 text-white border-none text-lg shadow-md hover:shadow-lg transition-all"
              >
                Update Assignment
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 border-none text-lg"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

        {/* --- Right Side: Visuals --- */}
        <div className="w-full lg:w-2/5 bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-8 border-l border-green-50">
          <div className="text-center mb-6">
             <h2 className="text-4xl font-bold text-green-800">EduCamp</h2>
             <span className="tracking-widest text-gray-500 uppercase text-xs">Instructor Panel</span>
          </div>
          <div className="bg-white rounded-full p-4 shadow-xl shadow-green-200/50">
             <Lottie
                animationData={formLottie}
                loop={true}
                className="w-64 h-64 md:w-80 md:h-80"
             />
          </div>
          <p className="mt-8 text-center text-gray-600 max-w-xs text-sm">
            Keep your course content fresh and up-to-date to ensure the best learning experience for your students.
          </p>
        </div>

      </div>
    </div>
  );
};

export default UpdateAssignment;