"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaGamepad,
  FaUser,
  FaHistory,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaGlobeAmericas,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and title */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center text-white hover:text-blue-100 transition-colors cursor-pointer"
              aria-label="Home"
            >
              <FaGlobeAmericas className="h-7 w-7 mr-2" />
              <span className="text-xl font-bold hidden sm:block">
                Globetrotter
              </span>
            </button>
            <button
              onClick={() => handleNavigation("/game-settings")}
              className="text-white p-2 ml-6 rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
              aria-label="Game Settings"
            >
              <span className="flex">
                <FaGamepad className="h-6 w-6 pr-2" /> New game
              </span>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-white focus:outline-none cursor-pointer"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <img
                  alt="Profile"
                  src={user.picture || "/placeholder.svg"}
                  className="h-9 w-9 rounded-full object-cover border-2 border-white hover:border-blue-200 transition-all"
                />
              </button>

              {/* Desktop dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-20 transform origin-top-right transition-all duration-200 ease-out">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {user.email || "User"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                  >
                    <FaUser className="h-5 w-5 mr-3 text-blue-500" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/history")}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                  >
                    <FaHistory className="h-5 w-5 mr-3 text-blue-500" />
                    <span>History</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex items-center p-4 border-b border-gray-200">
            <img
              alt="Profile"
              src={user.picture || "/placeholder.svg"}
              className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">
                {user.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.email || ""}
              </p>
            </div>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center w-full px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              <FaHome className="h-5 w-5 mr-3 text-blue-500" />
              <span>Home</span>
            </button>
            <button
              onClick={() => handleNavigation("/profile")}
              className="flex items-center w-full px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              <FaUser className="h-5 w-5 mr-3 text-blue-500" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => handleNavigation("/history")}
              className="flex items-center w-full px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            >
              <FaHistory className="h-5 w-5 mr-3 text-blue-500" />
              <span>History</span>
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex items-center w-full px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <FaSignOutAlt className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
