import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AssignmentCard from "./AssignmentCard";
import { AuthContext } from "../../Context/AuthContext";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { FaSearch, FaFilter } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineAssignment } from "react-icons/md"; // Icon for empty state
import toast from "react-hot-toast";

const Assignments = () => {
  const [search, setSearch] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const email = user?.email;

  // Function to fetch all data (used in initial load and reset)
  const fetchAllAssignments = () => {
    setLoading(true);
    axiosSecure
      .get("/createAssignment")
      .then((res) => {
        setAssignments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllAssignments();
  }, [axiosSecure]);

  const handleDelete = (id) => {
    if (!user) {
      return toast.error("Please Login First to perform this action");
    }
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post(`/deleteAssignment/${id}`, { email })
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire("Deleted!", "The assignment has been deleted.", "success");
              const remaining = assignments.filter((a) => a._id !== id);
              setAssignments(remaining);
            } else {
              Swal.fire(
                "Permission Denied",
                "You can only delete assignments you created.",
                "error"
              );
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something went wrong");
          });
      }
    });
  };

  const handleSearch = (value) => {
    // If search is empty, fetch all
    if (!value) {
      fetchAllAssignments();
      return;
    }
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

  const handleReset = () => {
    setSearch("");
    fetchAllAssignments();
  };

  const sortedAssignment = (order) => {
    const sorted = [...assignments].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return order === "asc"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });
    setAssignments(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* --- Page Header --- */}
      <div className="bg-white shadow-sm py-10 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Explore Assignments
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Browse through our collection of assignments. Filter by difficulty or search for specific topics to challenge yourself.
          </p>
        </div>
      </div>

      {/* --- Controls Toolbar (Search, Filter, Sort) --- */}
      <div className="container mx-auto px-4 mb-10">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Left: Search Bar */}
          <form
            className="relative w-full md:w-96"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(search);
            }}
          >
            <input
              type="text"
              placeholder="Search assignments..."
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
              type="submit"
            >
              <FaSearch />
            </button>
            
            {search && (
              <button
                title="Clear Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                onClick={handleReset}
                type="button"
              >
                <RxCross2 size={20} />
              </button>
            )}
          </form>

          {/* Right: Filters & Sort */}
          <div className="flex w-full md:w-auto gap-3">
            {/* Filter */}
            <div className="relative w-full md:w-48">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <FaFilter size={12}/>
              </div>
              <select
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 cursor-pointer bg-white appearance-none"
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch(e.target.value);
                }}
                value={["Easy", "Medium", "Hard"].includes(search) ? search : ""}
              >
                <option value="">All Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Sort */}
            <select
              className="w-full md:w-40 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 cursor-pointer bg-white"
              onChange={(e) => sortedAssignment(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Sort By</option>
              <option value="asc">Title (A - Z)</option>
              <option value="desc">Title (Z - A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- Content Area --- */}
      <div className="container mx-auto px-4">
        {loading ? (
          // Loading Spinner
          <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner text-success loading-lg"></span>
          </div>
        ) : assignments.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <MdOutlineAssignment className="text-6xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700">No Assignments Found</h3>
            <p className="text-gray-500 mt-2 mb-6">
              We couldn't find anything matching your search.
            </p>
            <button 
              onClick={handleReset}
              className="btn bg-green-700 hover:bg-green-800 text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          // Grid Layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;