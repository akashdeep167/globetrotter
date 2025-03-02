import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { checkInvitation } from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import bgImage from "../assets/bg.jpg";

const InviteHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const friendId = queryParams.get("friendId");

    const handleInvite = async () => {
      try {
        const response = await checkInvitation({ friendId }); // Send friendId as an object
        login(response);
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (error) {
        alert("Invalid invitation ID");
        navigate("/login");
      }
    };

    if (friendId) {
      handleInvite();
    } else {
      alert("Invalid invitation ID");
      navigate("/game-settings");
    }
  }, [location, navigate, login]);

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
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Verifying Id</h2>
        <div className="space-y-4">
          <div>
            <div className="text-center">Please wait for few seconds...</div>
            <LoadingSpinner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteHandler;
