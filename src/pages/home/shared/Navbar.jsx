import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { IoIosArrowForward } from "react-icons/io";
import ToggleTheme from "../../../Theme Toggle/ThemeToggle";
import Logo from "../../../brandLogo/Logo";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Helper function for consistent styling of links
  // It automatically checks if the link is active
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 transition-colors duration-200 ${
      isActive
        ? "text-green-700 font-bold" // Active Style
        : "text-gray-600 hover:text-green-700" // Inactive Style
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/assignments" className={navLinkClass}>
          Assignments
        </NavLink>
      </li>
      <li>
        <NavLink to="/pendingAssignment" className={navLinkClass}>
          Pending
        </NavLink>
      </li>
      {/* Anchor links for sections (non-routing) */}
      <li>
        <a href="#ourSuccess" className="flex items-center gap-1 text-gray-600 hover:text-green-700 transition-colors">
          Success
        </a>
      </li>
      <li>
        <a href="#FAQ" className="flex items-center gap-1 text-gray-600 hover:text-green-700 transition-colors">
          FAQ
        </a>
      </li>
    </>
  );

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 lg:px-8 font-sans">
      
      {/* --- START (Mobile Dropdown & Logo) --- */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box mt-3 w-52 p-4 shadow-lg z-[1] gap-2 border border-gray-100"
          >
            {links}
            <div className="divider my-1"></div>
            {/* Mobile Auth Buttons */}
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link to="/signIn" className="btn btn-sm btn-ghost border-green-700 text-green-700">
                  Log In
                </Link>
                <Link to="/signUp" className="btn btn-sm bg-green-700 text-white hover:bg-green-800">
                  Sign Up
                </Link>
                <div className="flex justify-center mt-2">
                  <ToggleTheme />
                </div>
              </div>
            ) : (
               <>
                <li><NavLink to="/createAssignment">Create Assignment</NavLink></li>
                <li><NavLink to="/attemptedAssignment">My Attempts</NavLink></li>
                <li><button onClick={handleSignOut} className="text-red-500">Log Out</button></li>
                <li className="mt-2"><ToggleTheme /></li>
               </>
            )}
          </ul>
        </div>
        
        {/* Logo */}
        <div className="ml-2 lg:ml-0">
          <Logo />
        </div>
      </div>

      {/* --- CENTER (Desktop Links) --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6 text-base font-medium">
          {links}
        </ul>
      </div>

      {/* --- END (Auth & Avatar) --- */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="flex items-center gap-4">
            {/* Desktop Theme Toggle (only visible when logged in to save space, or move outside) */}
            <div className="hidden lg:block">
               <ToggleTheme />
            </div>

            {/* User Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-green-600 hover:border-green-800 transition-all"
                title={user.displayName}
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={user.displayName || "User"}
                    src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} // Fallback image
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-xl mt-3 w-60 p-3 shadow-xl border border-gray-100 z-[1]"
              >
                <li className="menu-title text-gray-500">
                  Signed in as <span className="text-green-700 font-bold truncate">{user.displayName}</span>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <NavLink to="/createAssignment" className="py-3">
                    Create Assignment
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/attemptedAssignment" className="py-3">
                     My Attempted Assignment
                  </NavLink>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="py-2 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-3">
            <ToggleTheme />
            <Link to="/signIn">
              <button className="btn btn-ghost hover:bg-green-50 text-green-700 font-semibold">
                Log In
              </button>
            </Link>
            <Link to="/signUp">
              <button className="btn bg-green-700 hover:bg-green-800 text-white border-none shadow-md hover:shadow-lg transition-all">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;