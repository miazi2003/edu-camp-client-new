import React, { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the difference between frontend and backend in web development?",
      answer: "The frontend is what users see and interact with (like buttons, layouts, and forms). It's built using HTML, CSS, and JavaScript. The backend is the behind-the-scenes part — it handles databases, and server logic using technologies like Node.js, Express, and MongoDB."
    },
    {
      question: "What is an API and why is it important?",
      answer: "An API (Application Programming Interface) allows the frontend and backend to communicate. For example, when a user submits a form, the frontend sends data to the backend API, which processes and stores it. APIs are essential for building dynamic, data-driven applications."
    },
    {
      question: "Why is authentication needed in a web application?",
      answer: "Authentication ensures that only the right users can access specific parts of your website. It protects user data and allows features like login, personalized dashboards, and secure operations like deleting or updating data."
    },
    {
      question: "How do I get started with assignments?",
      answer: "Simply browse through our assignments, select one that matches your skill level, and click 'Start Assignment'. You'll get access to detailed instructions, resources, and a submission form to complete your work."
    },
    {
      question: "Can I submit assignments multiple times?",
      answer: "Yes, you can submit improvements to your assignments. Our system keeps track of your submissions and allows you to update your work based on feedback from tutors and peers."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto py-12 px-4 bg-white" id="FAQ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="text-lg">❓</span>
            Common Questions
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our platform and learning journey
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-white border border-gray-100 rounded-xl transition-all duration-300 ${
                openIndex === index 
                  ? 'shadow-lg ring-1 ring-blue-100' 
                  : 'shadow-sm hover:shadow-md'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 text-left focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <span className={`text-blue-600 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </span>
                </div>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index 
                    ? 'pb-5 border-t border-gray-100 mt-0' 
                    : 'max-h-0'
                }`}
              >
                <div className="pt-5">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">💬</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Still have questions?</h4>
                <p className="text-sm text-gray-600">Contact our support team for help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;