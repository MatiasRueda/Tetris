import { ChangeEvent, useState } from "react";
import Dificults from "../component/Dificults";
import Button from "../component/Button";
import { Difficulty, useConfigContext } from "../context/ConfigContext";
import { useScreenContext } from "../context/ScreenContext";
import "../assets/style/config.css";

export default function Config() {
  const screen = useScreenContext();
  const config = useConfigContext();
  const [difficulty, setDifficulty] = useState(config.difficulty);

  const accept = () => {
    config.changeDifficulty(difficulty);
    screen.changeToHome();
  };

  const changeDifficulty = (e: ChangeEvent<HTMLSelectElement>) => {
    const difficultyMap: Record<string, Difficulty> = {
      Easy: Difficulty.Easy,
      Medium: Difficulty.Medium,
      Hard: Difficulty.Hard,
    };
    const selectedDifficulty = difficultyMap[e.target.value] || Difficulty.Easy;
    setDifficulty(selectedDifficulty);
  };

  return (
    <section className="config">
      <div className="cont-config">
        <h2>Configuration</h2>
        <div className="cont-dificult">
          <p>Difficulty:</p>
          <Dificults
            difficulty={difficulty}
            changeDifficulty={changeDifficulty}
          />
        </div>
        <div className="cont-config-btns">
          <Button
            className="config-btn"
            value="Accept"
            click={accept}
            color="#3498db"
            disabled={config.difficulty === difficulty}
          />
          <Button
            className="config-btn"
            value="Go Home"
            color="#3498db"
            click={screen.changeToHome}
          />
        </div>
      </div>
    </section>
  );
}
