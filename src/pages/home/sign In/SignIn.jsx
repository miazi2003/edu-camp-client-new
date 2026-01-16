import React, { useContext } from "react";
import Lottie from "lottie-react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // Added Link for better routing
import toast from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthContext";
import loginLottie from "../../../assets/lottie/login.json";

const SignIn = () => {
  const { signInUser, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((res) => {
        toast.success("Successfully Signed in");
        navigate(from, { replace: true });
        console.log(res.user)
      })
      .catch((err) => {
        console.error(err);
        toast.error("Invalid Email or Password");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        toast.success("Successfully Signed In");
        navigate(from, { replace: true });
        console.log(res.user)
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Main Card Container */}
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px]">
        
        {/* --- Left Side: Animation & Branding (Hidden on small screens) --- */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-800 to-green-600 flex-col items-center justify-center p-8 text-white relative">
          <div className="z-10 text-center">
            <h1 className="text-5xl font-bold mb-2">EduCamp</h1>
            <p className="text-green-100 text-lg mb-8">
              Welcome back! Restart your learning journey today.
            </p>
            {/* Lottie Animation */}
            <div className="bg-white/10 rounded-full p-4 backdrop-blur-sm">
              <Lottie
                style={{ width: "350px", height: "350px" }}
                animationData={loginLottie}
                loop={true}
              />
            </div>
          </div>
          {/* decorative circle */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-0"></div>
        </div>

        {/* --- Right Side: Login Form --- */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Hello Again! 👋
            </h2>
            <p className="text-gray-500 mb-8">
              Enter your credentials to access your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                  required
                />
                <label className="label">
                  <span className="label-text-alt"></span>
                  <a href="#" className="label-text-alt link link-hover text-green-700 font-medium">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn w-full bg-green-700 hover:bg-green-800 text-white border-none shadow-md hover:shadow-lg transition-all text-lg"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex py-6 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="btn w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2"
            >
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center mt-6 text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="text-green-700 font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;