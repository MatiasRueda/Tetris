import Button from "./Button";
import { useScreenContext } from "../context/ScreenContext";
import Scores from "./Scores";
import "../assets/style/lose.css";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Validate from "./Validate";
import Fade from "./Fade";
import { useUserContext } from "../context/UserContext";
import { Method } from "../utils/method";
import { delay } from "../utils/delay";

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
  const total: [string, number] = [
    "Total",
    scores.reduce((prev, [_, current]) => prev + current, 0),
  ];

  const goValidate = () => {
    setScene(Scene.Validate);
  };

  const updateScore = () => {
    user.updateScore(total[1]);
    props.resetGame();
  };

  const goHome = async () => {
    screen.changeToHome();
    await new Promise((resolve) => setTimeout(resolve, delay));
    props.resetGame();
  };

  const disableSubmit = !user.info || total[1] <= Number(user.info.score);

  return (
    <section className="lose">
      <AnimatePresence mode="wait">
        <Fade key={scene}>
          {scene === Scene.Main && (
            <div className="cont-lose">
              <h2>You Lose!</h2>
              <Scores scores={[...scores, total]} />
              <div className="cont-lose-btns">
                <Button
                  disabled={disableSubmit}
                  class="start-btn"
                  click={goValidate}
                  value="Submit"
                  color="#d9534f"
                />
                <Button
                  class="start-btn"
                  click={goHome}
                  value="Go Home"
                  color="#d9534f"
                />
              </div>
            </div>
          )}
          {scene === Scene.Validate && (
            <Validate
              data={{
                username: user.info!.username,
                score: total[1].toString(),
                method: Method.Score,
                token: "",
              }}
              applyfunction={updateScore}
              class="cont-validate-lose"
            />
          )}
        </Fade>
      </AnimatePresence>
    </section>
  );
}
