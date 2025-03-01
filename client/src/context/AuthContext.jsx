import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected import
import LoadingSpinner from "../components/LoadingSpinner";
import { loginUser } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        setUser(JSON.parse(user));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
      }
    }
    setLoading(false); // Set loading to false after checking token
  }, []);

  const login = async (user, token) => {
    try {
      const res = await loginUser(user);
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsLoggedIn(true);
        setUser(res.data);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login Failed");
    }
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
