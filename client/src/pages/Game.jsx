import GameLive from "../components/GameLive";
import { useGameSettings } from "../context/GameSettingsContext";

const Game = () => {
  const { rounds } = useGameSettings();
  return (
    <>
      <GameLive rounds={rounds} />
    </>
  );
};

export default Game;
