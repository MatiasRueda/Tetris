import Button from "./Button";
import { useScreenContext } from "../context/ScreenContext";
import Scores from "./Scores";
import "../assets/style/lose.css";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Validate from "./Validate";
import Fade from "./Fade";
import { useUserContext } from "../context/UserContext";

enum Scene {
  Main,
  Validate,
}

export default function Lose(props: {
  level: number;
  lines: number;
  difficulty: number;
  score: number;
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

  return (
    <section className="lose">
      <AnimatePresence mode="wait">
        <Fade key={scene}>
          {scene === Scene.Main && (
            <div className="cont-lose">
              <h2>You Lose!</h2>
              <Scores scores={[...scores, total]} />
              <div className="cont-lose-btns">
                <Button class="start-btn" click={goValidate} value="Submit" />
                <Button
                  class="start-btn"
                  click={screen.changeToHome}
                  value="Go Home"
                />
              </div>
            </div>
          )}
          {scene === Scene.Validate && (
            <Validate
              data={{
                username: user.info!.username,
                score: total[1].toString(),
              }}
              class="cont-validate-lose"
            />
          )}
        </Fade>
      </AnimatePresence>
    </section>
  );
}
