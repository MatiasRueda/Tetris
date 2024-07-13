import { useState } from "react";
import Dificults from "../component/Dificults";
import HomeButton from "../component/Button";
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

  const changeDifficulty = (e: any) => {
    let difficulty = Difficulty.Easy;
    if (e.target.value === "Hard") difficulty = Difficulty.Hard;
    else if (e.target.value === "Medium") difficulty = Difficulty.Medium;
    else difficulty = Difficulty.Easy;
    setDifficulty(difficulty);
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
          <HomeButton class="config-btn" value="Accept" click={accept} />
          <HomeButton
            class="config-btn"
            value="Go home"
            click={screen.changeToHome}
          />
        </div>
      </div>
    </section>
  );
}
