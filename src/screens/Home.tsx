import { useScreenContext } from "../context/ScreenContext";
import "../assets/style/home.css";
import Button from "../component/Button";

export default function Home() {
  const screen = useScreenContext();

  return (
    <section className="home">
      <h1>Tetris</h1>
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
