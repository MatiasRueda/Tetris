import { useScreenContext } from "../context/ScreenContext";
import "../assets/style/home.css";
import HomeButton from "../component/HomeButton";

export default function Home() {
  const screen = useScreenContext();

  return (
    <section className="home">
      <h1>Tetris</h1>
      <section className="home-btns">
        <HomeButton
          class="home-btn"
          value="Start game"
          click={screen.changeToGame}
        />
        <HomeButton
          class="home-btn"
          value="Config"
          click={screen.changeToConfig}
        />
        <HomeButton
          class="home-btn"
          value="Credits"
          click={screen.changeToCredits}
        />
      </section>
    </section>
  );
}
