import { useScreenContext } from "../context/ScreenContext";
import "../assets/style/lose.css";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Fade from "./Fade";
import { useUserContext } from "../context/UserContext";
import { delayUntilClosing } from "../utils/delay";
import LoseMainContent from "./LoseMainContent";
import LoseValidateContent from "./LoseValidateContent";
import { calculateTotalScore } from "../utils/calculateTotalScore";

enum Scene {
  Main,
  Validate,
}

export default function Lose(props: {
  level: number;
  lines: number;
  difficulty: number;
  score: number;
  resetGame: () => void;
}) {
  const screen = useScreenContext();
  const user = useUserContext();
  const [scene, setScene] = useState<Scene>(Scene.Main);
  const scores: [string, number][] = [
    ["Level", props.level],
    ["Lines", props.lines],
    ["Difficulty", props.difficulty],
    ["Score", props.score],
  ];

  const totalScore = calculateTotalScore(scores);
  const total: [string, number] = ["Total", totalScore];

  const goValidate = () => {
    setScene(Scene.Validate);
  };

  const updateScore = async () => {
    user.updateScore(total[1]);
  };

  const goHomeAndResetGame = async () => {
    screen.changeToHome();
    await delayUntilClosing();
    props.resetGame();
  };

  const updateGoHomeAndResetGame = async () => {
    updateScore();
    goHomeAndResetGame();
  };

  const goLose = () => {
    setScene(Scene.Main);
  };

  const disableSubmit = !user.info || total[1] <= Number(user.info.score);

  return (
    <section className="lose">
      <AnimatePresence mode="wait">
        <Fade key={scene}>
          {scene === Scene.Main && (
            <LoseMainContent
              key={Scene.Main}
              scores={scores}
              total={total}
              disableSubmit={disableSubmit}
              goValidate={goValidate}
              updateGoHomeAndResetGame={updateGoHomeAndResetGame}
            />
          )}
          {scene === Scene.Validate && (
            <LoseValidateContent
              key={Scene.Validate}
              score={total[1].toString()}
              updateGoHomeAndResetGame={updateGoHomeAndResetGame}
              goLose={goLose}
            />
          )}
        </Fade>
      </AnimatePresence>
    </section>
  );
}
