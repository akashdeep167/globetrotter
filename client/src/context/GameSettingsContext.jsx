import React, { createContext, useState, useContext } from "react";

const GameSettingsContext = createContext();

export const GameSettingsProvider = ({ children }) => {
  const [gameSettings, setGameSettings] = useState({
    rounds: 1,
  });

  return (
    <GameSettingsContext.Provider value={{ gameSettings, setGameSettings }}>
      {children}
    </GameSettingsContext.Provider>
  );
};

export const useGameSettings = () => useContext(GameSettingsContext);
