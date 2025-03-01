import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgImage from "../assets/bg.jpg";
import LoadingSpinner from "../components/LoadingSpinner";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/game-settings");
    }
  }, []);

  const handleGoogleSuccess = (response) => {
    const token = response.credential;
    const user = jwtDecode(token);
    login(user, token); // Pass the user to the login function
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/game-settings");
    }, 1000); // Simulate loading time
  };

  const handleGoogleFailure = () => {
    alert("Google login failed. Please try again.");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center">Log In</h2>
          <div className="flex justify-center py-2 px-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
