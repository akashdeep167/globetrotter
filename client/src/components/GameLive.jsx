import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Check, MapPin, X } from "lucide-react";
import bgImage from "../assets/bg.jpg";
import { useGameSettings } from "../context/GameSettingsContext";
import { VscDebugRestart } from "react-icons/vsc";
import { GrSend } from "react-icons/gr";
import Button from "./Button";
import { IoIosRefresh } from "react-icons/io";
import ProgressBar from "./ProgressBar";

const Card = ({ children, className, ...props }) => (
  <div className={`rounded-lg ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className, ...props }) => (
  <div className={`p-3 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h2 className={`text-xl font-semibold ${className}`} {...props}>
    {children}
  </h2>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const ScoreCard = ({ children, className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const placeApi = {
  city: "Paris",
  country: "France",
  clues: [
    "This city is home to a famous tower that sparkles every night.",
    "Known as the 'City of Love' and a hub for fashion and art.",
  ],
  fun_fact: [
    "The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!",
    "Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules.",
  ],
  trivia: [
    "This city is famous for its croissants and macarons. Bon appétit!",
    "Paris was originally a Roman city called Lutetia.",
  ],
  options: ["Paris", "Tokyo", "New York", "London"],
};

const getRandomDestination = () => {
  return placeApi;
};

function GameLive() {
  const { gameSettings } = useGameSettings();
  console.log(gameSettings);
  const [destination, setDestination] = useState(getRandomDestination());
  const [clue, setClue] = useState(
    destination.clues[Math.floor(Math.random() * destination.clues.length)]
  );
  const [score, setScore] = useState({ correct: 0, incorrect: 0, skipped: 0 });
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [remainingRounds, setRemainingRounds] = useState(1);

  const progress = (remainingRounds / gameSettings.rounds) * 100;

  const nextDestination = useCallback(() => {
    if (!answered) {
      setScore((prevScore) => ({
        ...prevScore,
        skipped: prevScore.skipped + 1,
      }));
    }
    setAnswered(false);
    setIsCorrect(null);

    const newDestination = getRandomDestination();
    setDestination(newDestination);
    setClue(
      newDestination.clues[
        Math.floor(Math.random() * newDestination.clues.length)
      ]
    );
    setFeedback("");
  }, [answered]);

  const getRandomClue = () => {
    setClue(
      destination.clues[Math.floor(Math.random() * destination.clues.length)]
    );
  };
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Changes you made may not be saved. Do you want to leave the game?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleAnswer = (answer) => {
    if (answered) return;
    setAnswered(true);

    if (answer === destination.city) {
      //check-answer
      setScore((prevScore) => ({
        ...prevScore,
        correct: prevScore.correct + 1,
      }));
      setFeedback(
        destination.fun_fact[
          Math.floor(Math.random() * destination.fun_fact.length)
        ]
      );
      setIsCorrect(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        incorrect: prevScore.incorrect + 1,
      }));
      setFeedback(
        destination.fun_fact[
          Math.floor(Math.random() * destination.fun_fact.length)
        ]
      );
      setIsCorrect(false);
    }
  };

  const totalQuestions = score.correct + score.incorrect;
  const accuracy =
    totalQuestions > 0 ? Math.round((score.correct / totalQuestions) * 100) : 0;

  if (remainingRounds > gameSettings?.rounds) {
    //we have to save the match
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-full max-w-md mx-auto overflow-hidden shadow-xl border-0 bg-white/90 backdrop-blur-sm md:mt-15">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2 h-15">
              <MapPin className="h-6 w-6" />
              Travel Destination Quiz
            </CardTitle>
            <div>
              {remainingRounds > gameSettings.rounds
                ? gameSettings.rounds
                : remainingRounds}{" "}
              / {gameSettings.rounds}
            </div>
          </div>
          <ProgressBar progress={progress} />
        </CardHeader>
        <ScoreCard className="flex flex-col p-6 pt-0 gap-4">
          <div className="w-full flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500">Correct</span>
              <span className="text-xl font-bold text-green-600">
                {score.correct}
              </span>
            </div>

            <div className="h-10 w-px bg-slate-200"></div>

            <div className="flex flex-col">
              <span className="text-sm text-slate-500">Incorrect</span>
              <span className="text-xl font-bold text-red-500">
                {score.incorrect}
              </span>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>

            <div className="flex flex-col">
              <span className="text-sm text-slate-500">Skipped</span>
              <span className="text-xl font-bold text-red-500">
                {score.skipped}
              </span>
            </div>

            <div className="h-10 w-px bg-slate-200"></div>

            <div className="flex flex-col">
              <span className="text-sm text-slate-500">Accuracy</span>
              <span className="text-xl font-bold text-blue-600">
                {accuracy}%
              </span>
            </div>
          </div>
        </ScoreCard>
        {remainingRounds > gameSettings?.rounds ? (
          <div className="w-full p-6 pt-0 flex justify-between">
            <Button
              className="py-3 text-lg justify-center px-4 transition-all flex items-center cursor-pointer"
              variant="normal"
              onClick={() => {
                setRemainingRounds(1);
                setScore({ correct: 0, incorrect: 0, skipped: 0 });
              }}
            >
              <VscDebugRestart />
              <span className="ml-3">Play again!</span>
            </Button>

            <Button
              className=" py-3 text-lg justify-center px-4 transition-all flex items-center cursor-pointer"
              onClick={() => {}}
            >
              <span className="mr-3">Challenge a Friend</span> <GrSend />
            </Button>
          </div>
        ) : (
          <>
            <CardContent className="p-6 pt-0 space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-blue-800 mb-1">
                    CLUE
                  </h3>
                  <p className="text-lg font-medium text-blue-900">{clue}</p>
                </div>
                <div
                  className="flex mt-auto cursor-pointer hover:bg-gray-400 p-2 ml-2 rounded-full"
                  onClick={() => getRandomClue()}
                >
                  <IoIosRefresh />
                </div>
              </div>

              {feedback ? (
                <div
                  className={`p-4 rounded-lg border animate-fadeIn ${
                    isCorrect
                      ? "bg-green-50 border-green-100 text-green-800"
                      : "bg-amber-50 border-amber-100 text-amber-800"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`rounded-full p-1 ${
                        isCorrect
                          ? "bg-green-100 text-green-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {isCorrect ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <X className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium mb-1">
                        {isCorrect ? "Correct!" : "Incorrect!"}
                      </p>
                      <p className="text-sm">{feedback}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {destination.options.map((name, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleAnswer(name)}
                      disabled={answered}
                      variant={
                        answered
                          ? name === destination.city
                            ? "default"
                            : isCorrect === false && name !== destination.city
                            ? "outline"
                            : "outline"
                          : "outline"
                      }
                      className={`w-full py-4 text-lg justify-start px-4 transition-all flex items-center ${
                        answered && name === destination.city
                          ? "bg-green-600 hover:bg-green-600 text-white border-green-600"
                          : answered &&
                            isCorrect === false &&
                            name !== destination.city
                          ? "bg-white text-slate-700 border-slate-200"
                          : "hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                      }`}
                    >
                      <span className="flex-1">{name}</span>
                      {answered && name === destination.city && (
                        <Check className="h-5 w-5 text-white" />
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
            <div className="w-full p-6 pt-0">
              <Button
                className="w-full py-3 text-lg justify-center px-4 transition-all flex items-center cursor-pointer"
                onClick={() => {
                  setRemainingRounds((prev) => prev + 1);
                  nextDestination();
                }}
              >
                {remainingRounds === gameSettings.rounds
                  ? "See Results!"
                  : answered
                  ? "Next question"
                  : "Skip question"}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default GameLive;
