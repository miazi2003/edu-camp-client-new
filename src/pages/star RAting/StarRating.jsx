import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const [rate, setRate] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState(""); // State for the message

  // Function to handle the final submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rate === 0) {
      alert("Please select a rating before submitting.");
      return;
    }
    // This is where you would send data to your backend
    console.log({ rating: rate, review: message });
    alert(`Submitted! Rating: ${rate}, Message: "${message}"`);
    
    // Optional: Reset form after submit
    setRate(0);
    setMessage("");
  };

  return (
    <div className="w-full max-w-md p-6 border rounded shadow-sm bg-white mx-auto">
      <form onSubmit={handleSubmit}>
        {/* --- Star Rating Section --- */}
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-xl font-bold">Rating:</h1>
          <div className="flex">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <button
                  key={index}
                  type="button"
                  className="cursor-pointer transition-colors duration-200 focus:outline-none"
                  onClick={() => setRate(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                >
                  <FaStar
                    size={30}
                    color={currentRating <= (hover || rate) ? "red" : "green"}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* --- Message Writing Section --- */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Your Feedback:</label>
          <textarea
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            rows="4"
            placeholder="Tell us about your experience..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* --- Submit Button --- */}
        <button
          type="submit"
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200 font-semibold"
        >
          Submit Review
        </button>

        {/* Debugging View (Optional) */}
        <div className="mt-4 text-xs text-gray-400 text-center">
           Current: {rate} Stars | Chars: {message.length}
        </div>
      </form>
    </div>
  );
};

export default StarRating;