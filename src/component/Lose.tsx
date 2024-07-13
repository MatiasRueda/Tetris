import Button from "./Button";
import { useScreenContext } from "../context/ScreenContext";
import Scores from "./Scores";
import "../assets/style/lose.css";

export default function Lose(props: {
  level: number;
  lines: number;
  difficulty: number;
  score: number;
}) {
  const screen = useScreenContext();
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
  return (
    <section className="lose">
      <div className="cont-lose">
        <h2>You Lose!</h2>
        <Scores scores={[...scores, total]} />
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
