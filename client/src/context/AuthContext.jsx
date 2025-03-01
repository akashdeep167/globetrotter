import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected import
import LoadingSpinner from "../components/LoadingSpinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    // console.log("Token from localStorage:", token);
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        // console.log("Decoded user:", decodedUser);
        setUser(decodedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
      }
    }
    setLoading(false); // Set loading to false after checking token
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
  };

  if (loading) {
    return <LoadingSpinner />; // Render loading state
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
