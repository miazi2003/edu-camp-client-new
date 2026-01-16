import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaCalendarAlt,
  FaClock,
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DeadlineIssue = () => {
  const axiosSecure = useAxiosSecure();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/deadline")
      .then((res) => {
        setAssignments(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getDaysUntilDeadline = (dueDate) => {
    const diff =
      new Date(dueDate).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "hard":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center">Loading assignments...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <MdAccessTimeFilled />
            Extended Deadline
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Long Deadline{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Assignments
            </span>
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto">
            Take your time with these assignments.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assignments.map((assignment, index) => {
            const daysLeft = getDaysUntilDeadline(
              assignment.dueDate
            );

            return (
              <motion.div
                key={assignment._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden"
                style={{ willChange: "transform" }}
              >
                {/* Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
                    <img
                      src={assignment.thumbnailImageURL}
                      alt={assignment.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1">
                      <FaClock className="text-blue-600 text-xs" />
                      <span className="text-sm font-semibold text-blue-700">
                        {daysLeft > 0
                          ? `${daysLeft} days left`
                          : "Due soon"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold border rounded-full ${getDifficultyColor(
                          assignment.difficulty
                        )}`}
                      >
                        {assignment.difficulty || "Medium"}
                      </span>

                      <Link
                        to={`/viewAssignments/${assignment._id}`}
                        className="text-blue-600 text-sm flex items-center gap-1"
                      >
                        View <FaArrowRight className="text-xs" />
                      </Link>
                    </div>

                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      {assignment.title}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {assignment.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <FaGraduationCap className="text-emerald-600" />
                        <span className="font-semibold">
                          {assignment.marks || 100} Marks
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-blue-600" />
                        <span className="font-semibold">
                          {formatDate(assignment.dueDate)}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/viewAssignments/${assignment._id}`}
                    >
                      <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
                        Start Assignment
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Contained Glow (NO OVERFLOW) */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-5 blur-xl transition pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DeadlineIssue;
