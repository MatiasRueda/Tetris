import { useScreenContext } from "../context/ScreenContext";
import Button from "../component/Button";
import "../assets/style/home.css";
import UserAccessPanel from "../component/UserAccessPanel";

export default function Home() {
  const screen = useScreenContext();

  return (
    <section className="home">
      <div className="cont-header">
        <h1>Tetris</h1>
        <UserAccessPanel />
      </div>
      <section className="home-btns">
        <Button
          class="home-btn common-btn"
          value="Start game"
          click={screen.changeToGame}
        />
        <Button
          class="home-btn common-btn"
          value="Config"
          click={screen.changeToConfig}
        />
        <Button
          class="home-btn common-btn"
          value="Credits"
          click={screen.changeToCredits}
        />
      </section>
    </section>
  );
}
