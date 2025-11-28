
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthContext";

export default function RentWheelsNavbar() {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // New: mobile menu state
  const activeClass = "text-blue-600 border-b-2 border-blue-600";

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen); // New

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-800">
        RentWheels
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-6 items-center">
        <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>Home</NavLink>
        <NavLink to="/browse-cars" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>Browse Cars</NavLink>
        <NavLink to="/add-car" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>Add Car</NavLink>
        <NavLink to="/my-listings" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>My Listings</NavLink>
        <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>My Bookings</NavLink>

        {/* User Dropdown */}
        {user ? (
          <div className="relative">
            <img
              onClick={toggleDropdown}
              src={user.photoURL || "https://i.ibb.co/7WymFq1/default-user.png"}
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4 z-50">
                <p className="font-semibold">{user.displayName || "User"}</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <button
                  onClick={logout}
                  className="mt-2 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Login
          </NavLink>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden p-2 rounded-md focus:outline-none focus:ring"
      >
        {/* Hamburger Icon */}
        <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
        <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
        <div className="w-6 h-0.5 bg-gray-800"></div>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-2 p-4 md:hidden z-50">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>Home</NavLink>
          <NavLink to="/browse-cars" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>Browse Cars</NavLink>
          <NavLink to="/add-car" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>Add Car</NavLink>
          <NavLink to="/my-listings" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>My Listings</NavLink>
          <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>My Bookings</NavLink>

          {/* User Dropdown Mobile */}
          {user ? (
            <div className="mt-2 relative">
              <img
                onClick={toggleDropdown}
                src={user.photoURL || "https://i.ibb.co/7WymFq1/default-user.png"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              {dropdownOpen && (
                <div className="mt-2 w-full bg-white shadow-lg rounded-md p-4 z-50">
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <button
                    onClick={logout}
                    className="mt-2 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-2">
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
