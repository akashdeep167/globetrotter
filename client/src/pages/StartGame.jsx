import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameSettings } from "../context/GameSettingsContext";
import bgImage from "../assets/bg.jpg";
import LoadingSpinner from "../components/LoadingSpinner";

const StartGame = () => {
  const [loading, setLoading] = useState(false);
  const { gameSettings, setGameSettings } = useGameSettings();

  const [rounds, setRounds] = useState(gameSettings.rounds);
  const navigate = useNavigate();

  const handleRoundChange = (event) => {
    setRounds(event.target.value);
  };

  const handlePlay = () => {
    setGameSettings({ rounds });
    console.log(gameSettings);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/game");
    }, 1000); // Simulate loading time
  };

  return (
    <>
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
            <h2 className="text-2xl font-bold text-center">Game Settings</h2>
            <div className="space-y-4">
              <div>
                <div className="text-center">{rounds}</div>
                <label className="block text-sm font-medium text-gray-700">
                  Select number of rounds
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={rounds}
                  onChange={handleRoundChange}
                  className="w-full slider"
                />
              </div>
              <div className="w-full mt-10 flex">
                <button
                  onClick={handlePlay}
                  className="px-8 ml-auto h-15 text-xl py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                >
                  Play
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StartGame;
