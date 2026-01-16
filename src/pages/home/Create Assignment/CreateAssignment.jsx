import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import formLottie from "../../../assets/lottie/forms.json";
import { AuthContext } from "../../../Context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCalendarAlt, FaLayerGroup, FaImage, FaEdit } from "react-icons/fa";

const CreateAssignment = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const [dueDate, setDueDate] = useState(new Date()); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const assignment = Object.fromEntries(formData.entries());

    // Basic Validation
    if (assignment.description.length < 50) {
      return toast.error("Description should be at least 50 characters long.");
    }
    if (assignment.marks < 0 || assignment.marks > 100) {
        return toast.error("Marks must be between 0 and 100");
    }

    const newAssignment = {
      email: user?.email,
      ...assignment,
      dueDate: dueDate, 
    };

    // Post data to the server
    axiosSecure
      .post("/createAssignment", newAssignment)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Assignment Created Successfully");
          form.reset();
          navigate("/assignments");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message || "Failed to create assignment");
      });
  };

  // Shared class for all inputs to ensure consistent thin borders
  const inputClass = "input input-bordered w-full border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 bg-gray-50 focus:bg-white transition-all";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col-reverse lg:flex-row">
        
        {/* --- Left Side: Form Section --- */}
        <div className="w-full lg:w-3/5 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FaEdit className="text-green-700" />
              Create New Assignment
            </h1>
            <p className="text-gray-500 mt-2">
              Fill in the details below to create a new task for students.
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
                  placeholder="e.g., React Hooks Deep Dive"
                  className={inputClass}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-700">Marks (0-100)</label>
                <input
                  type="number"
                  name="marks"
                  placeholder="100"
                  min="0"
                  max="100"
                  className={inputClass}
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
                  defaultValue="Easy"
                  className={`select select-bordered w-full border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 bg-gray-50 focus:bg-white transition-all`}
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
                <div className="w-full">
                    <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className={inputClass} // Applied the same thin border class here
                    wrapperClassName="w-full"
                    />
                </div>
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
                placeholder="https://example.com/image.jpg"
                className={inputClass}
                required
              />
            </div>

            {/* Row 4: Description */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Write a detailed description of the assignment..."
                rows="5"
                className="textarea textarea-bordered w-full border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 bg-gray-50 focus:bg-white transition-all resize-none text-base"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-green-700 hover:bg-green-800 text-white border-none shadow-md hover:shadow-lg transition-all text-lg mt-4"
            >
              Create Assignment
            </button>

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
            Empower your students with engaging tasks. Build the future of web development together.
          </p>
        </div>

      </div>
    </div>
  );
};

export default CreateAssignment;