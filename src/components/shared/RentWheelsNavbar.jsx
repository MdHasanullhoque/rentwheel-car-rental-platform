
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthContext";

export default function RentWheelsNavbar() {
  const { user, logout } = useContext(AuthContext); //  Auth state
  const [dropdownOpen, setDropdownOpen] = useState(false); //  dropdown state
  const activeClass = "text-blue-600 border-b-2 border-blue-600";

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen); //  dropdown toggle

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-800">
        RentWheels
      </Link>

      {/* Nav links */}
      <ul className="flex gap-6 items-center">
        <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>
          Home
        </NavLink>
        <NavLink to="/browse-cars" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>
          Browse Cars
        </NavLink>
        <NavLink to="/add-car" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>
          Add Car
        </NavLink>
        <NavLink to="/my-listings" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>
          My Listings
        </NavLink>
        <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? activeClass : "text-gray-700")}>
          My Bookings
        </NavLink>

        {/*  User photo + dropdown */}
        {user ? (
          <div className="relative">
            <img
              onClick={toggleDropdown} // click for dropdown open
              src={user.photoURL || "https://i.ibb.co/7WymFq1/default-user.png"} // Gmail photo or default
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full cursor-pointer"
            />

            {/* dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4 z-50">
                <p className="font-semibold">{user.displayName || "User"}</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <button
                  onClick={logout} // logout function
                  className="mt-2 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Login button if user is not logged
          <NavLink
            to="/login"
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </NavLink>
        )}
      </ul>
    </nav>
  );
}
