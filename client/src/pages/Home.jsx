import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.jpg";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white bg-opacity-80 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Welcome to Globetrotter – The Ultimate Travel Guessing Game! 🌍✨
        </h1>
        <p className="text-lg text-gray-700">
          Test your knowledge of the world’s most iconic destinations with
          cryptic clues that challenge your inner explorer. Can you guess the
          hidden location? Unlock fascinating fun facts, exciting trivia, and
          surprises with every correct guess! Whether you're a geography whiz or
          just love to travel, Globetrotter promises a fun and interactive
          journey across the globe. Ready to embark on this adventure? Let’s
          play and see how many destinations you can uncover! 🚀🎉
        </p>
        <button
          onClick={() => navigate("/game-settings")}
          className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 cursor-pointer"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Home;
