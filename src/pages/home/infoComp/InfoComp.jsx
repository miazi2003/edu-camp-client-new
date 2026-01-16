import React from "react";
import { FaTv, FaGraduationCap } from "react-icons/fa6";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const InfoComp = () => {
  const stats = [
    {
      id: 1,
      icon: FaTv,
      value: "10k+",
      label: "Online Courses",
      description: "Industry-relevant courses",
      color: "from-amber-400 to-orange-400",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      borderColor: "border-amber-100",
      iconColor: "text-amber-600",
      delay: 0
    },
    {
      id: 2,
      icon: FaChalkboardTeacher,
      value: "200+",
      label: "Expert Tutors",
      description: "Industry professionals",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-100",
      iconColor: "text-blue-600",
      delay: 0.1
    },
    {
      id: 3,
      icon: FaUsers,
      value: "60k+",
      label: "Active Students",
      description: "Worldwide learners",
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      borderColor: "border-emerald-100",
      iconColor: "text-emerald-600",
      delay: 0.2
    },
    {
      id: 4,
      icon: FaGraduationCap,
      value: "6k+",
      label: "Certifications",
      description: "Accredited programs",
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
      borderColor: "border-violet-100",
      iconColor: "text-violet-600",
      delay: 0.3
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="text-emerald-600">📊</span>
            Our Achievements
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Transforming Lives Through
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Education
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Join thousands of learners who have transformed their careers with our expert-led programs.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className={`
                relative overflow-hidden 
                rounded-2xl 
                border ${stat.borderColor}
                ${stat.bgColor}
                p-6
                transition-all duration-300
                group-hover:shadow-xl
                h-full
              `}>
                {/* Gradient accent */}
                <div className={`
                  absolute top-0 left-0 w-full h-1
                  bg-gradient-to-r ${stat.color}
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                `} />
                
                {/* Icon */}
                <div className="mb-6">
                  <div className={`
                    w-16 h-16 rounded-xl
                    bg-white
                    flex items-center justify-center
                    shadow-sm
                    border ${stat.borderColor}
                    group-hover:scale-110
                    transition-all duration-300
                  `}>
                    <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <h3 className={`
                      text-3xl md:text-4xl
                      font-bold
                      bg-gradient-to-r ${stat.color}
                      bg-clip-text text-transparent
                    `}>
                      {stat.value}
                    </h3>
                    <span className="text-gray-500 text-sm font-medium">+</span>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-gray-900">
                    {stat.label}
                  </h4>
                  
                  <p className="text-gray-600 text-sm">
                    {stat.description}
                  </p>
                </div>

                {/* Hover effect background */}
                <div className={`
                  absolute inset-0
                  bg-gradient-to-br ${stat.color}
                  opacity-0 group-hover:opacity-5
                  transition-opacity duration-300
                  pointer-events-none
                `} />
              </div>

              {/* Subtle glow effect */}
              <div className={`
                absolute -inset-1
                bg-gradient-to-r ${stat.color}
                rounded-2xl
                opacity-0 group-hover:opacity-10
                blur-xl
                transition-opacity duration-300
                -z-10
                pointer-events-none
              `} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-16 pt-8 border-t border-gray-100"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Our Platform?
              </h3>
              <p className="text-gray-600">
                We're committed to providing high-quality education with proven results. 
                Our success metrics speak to our dedication to student achievement and 
                career transformation.
              </p>
            </div>
            
            <div className="lg:w-1/2 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-lg">🎯</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">98%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">⭐</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-500">Student Rating</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InfoComp;