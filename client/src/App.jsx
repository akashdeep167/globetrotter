import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GameSettingsProvider } from "./context/GameSettingsContext";
import { AuthProvider } from "./context/AuthContext";
import StartGame from "./pages/StartGame";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";
import Invite from "./pages/Invite";
import InviteHandler from "./pages/InviteHandler";

const App = () => {
  const clientId =
    "479742385310-iggsq3565t8d651qcodrh47mm2kag3o3.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <GameSettingsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/game-settings"
                element={<ProtectedRoute element={StartGame} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/game" element={<ProtectedRoute element={Game} />} />
              <Route
                path="/profile"
                element={<ProtectedRoute element={Profile} />}
              />
              <Route
                path="/history"
                element={<ProtectedRoute element={History} />}
              />
              <Route path="/invite" element={<InviteHandler />} />
            </Routes>
          </Router>
        </GameSettingsProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
