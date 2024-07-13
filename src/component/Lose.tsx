import Button from "./Button";
import "../assets/style/lose.css";
import { useScreenContext } from "../context/ScreenContext";

export default function Lose() {
  const screen = useScreenContext();
  return (
    <section className="lose">
      <div className="cont-lose">
        <h2>You Lose!</h2>
        <div className="cont-lose-btns">
          <Button class="start-btn" click={() => {}} value="Submit" />
          <Button
            class="start-btn"
            click={screen.changeToHome}
            value="Go Home"
          />
        </div>
      </div>
    </section>
  );
}
