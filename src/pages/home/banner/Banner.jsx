import React from "react";
import { FcIdea, FcCollaboration, FcOnlineSupport } from "react-icons/fc";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { TbBrandFigma, TbBrandNextjs } from "react-icons/tb";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="min-h-[60vh] max-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="bg-white rounded-xl  overflow-hidden ">
          <div className="flex flex-col lg:flex-row">
            {/* Left Content Section - Compact */}
            <div className="lg:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <div className="space-y-4">
                {/* Compact Tagline */}
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                  <FcCollaboration className="text-sm" />
                  Transform Your Learning
                </div>

                {/* Compact Heading */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
                  Master Skills with
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                    Expert Guidance
                  </span>
                </h1>

                {/* Compact Description */}
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
                  Access unlimited assignments, learn from industry experts, 
                  and join a community of motivated learners.
                </p>

                {/* Compact Stats */}
                <div className="grid grid-cols-3 gap-3 pt-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-emerald-600">500+</div>
                    <div className="text-xs text-gray-500">Courses</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-emerald-600">98%</div>
                    <div className="text-xs text-gray-500">Success</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-emerald-600">24/7</div>
                    <div className="text-xs text-gray-500">Support</div>
                  </div>
                </div>

                {/* Compact CTA Button */}
                <div className="pt-4">
                  <Link to="/assignments">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10">Start Learning Free</span>
                      <svg
                        className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Image & Icons Section - Compact */}
            <div className="lg:w-1/2 relative min-h-[350px] p-6">
              <div className="relative h-full flex items-center justify-center">
                {/* Compact Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl" />
                
                {/* Compact Main Image */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <div className="relative w-64 h-64 md:w-72 md:h-72">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl transform rotate-3 opacity-10" />
                    <img
                      src="https://i.ibb.co/cn8GqL7/07.png"
                      alt="Student learning online"
                      className="relative w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                </motion.div>

                {/* Compact Floating Icons */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 md:top-6 md:right-10 bg-white p-3 rounded-xl shadow-lg border border-gray-100"
                >
                  <FcIdea className="w-8 h-8" />
                </motion.div>

                <motion.div
                  animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-16 left-4 md:bottom-20 md:left-8 bg-white p-3 rounded-xl shadow-lg border border-gray-100"
                >
                  <FaReact className="w-8 h-8 text-blue-500" />
                </motion.div>

                <motion.div
                  animate={{ rotate: [0, 4, 0, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 left-2 md:top-24 md:left-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100"
                >
                  <TbBrandFigma className="w-8 h-8 text-purple-600" />
                </motion.div>

                {/* Compact Floating Card */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-[180px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                      <FcOnlineSupport className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Live Support</div>
                      <div className="text-xs text-gray-500">24/7 Available</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Instant help from expert tutors
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Compact Tech Stack Bar */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-gray-500 text-sm font-medium">Trusted by learners worldwide</span>
              <div className="flex items-center gap-4">
                <FaReact className="w-6 h-6 text-blue-500" />
                <TbBrandNextjs className="w-6 h-6 text-gray-900" />
                <FaNodeJs className="w-6 h-6 text-green-600" />
                <FaPython className="w-6 h-6 text-blue-600" />
                <TbBrandFigma className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;