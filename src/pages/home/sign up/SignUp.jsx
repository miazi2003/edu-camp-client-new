import React, { useContext } from "react";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Updated imports
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthContext";
import registerLottie from "../../../assets/lottie/register.json";

const SignUp = () => {
  const { signUpUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Fixed: Defined location

  const from = location.state?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    // --- Password Validation ---
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one Uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one Lowercase letter");
      return;
    }

    // --- Account Creation ---
    signUpUser(email, password)
      .then((res) => {
        // Update Profile after successful signup
        updateUser(name, photo)
          .then(() => {
            toast.success("Successfully Signed Up!");
            form.reset();
            navigate(from, { replace: true });
          })
          .catch((err) => {
            console.error(err);
            toast.error("Account created, but profile update failed.");
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Main Card Container */}
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[650px]">
        
        {/* --- Left Side: Animation & Branding (Hidden on small screens) --- */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-800 to-green-600 flex-col items-center justify-center p-8 text-white relative">
          <div className="z-10 text-center">
            <h1 className="text-5xl font-bold mb-2">Join EduCamp</h1>
            <p className="text-green-100 text-lg mb-8">
              Start your learning journey with us today.
            </p>
            {/* Lottie Animation */}
            <div className="bg-white/10 rounded-full p-4 backdrop-blur-sm">
              <Lottie
                style={{ width: "350px", height: "350px" }}
                animationData={registerLottie}
                loop={true}
              />
            </div>
          </div>
          {/* Decorative Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-0"></div>
        </div>

        {/* --- Right Side: Registration Form --- */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 mb-6">
              Fill in your details to get started.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-gray-700">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-gray-700">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                  required
                />
              </div>

              {/* Photo URL Input */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-gray-700">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photo"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-gray-700">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                  required
                />
                <label className="label py-0 mt-1">
                  <span className="label-text-alt text-gray-400 text-xs">
                    Must have 6+ chars, 1 uppercase & 1 lowercase.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-full mt-4 bg-green-700 hover:bg-green-800 text-white border-none shadow-md hover:shadow-lg transition-all text-lg"
              >
                Sign Up
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signIn"
                className="text-green-700 font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;