import Button from "./Button";
import Scores from "./Scores";

export default function LoseMainContent(props: {
  scores: [string, number][];
  total: [string, number];
  disableSubmit: boolean;
  goValidate: () => void;
  updateAndGoHome: () => Promise<void>;
}) {
  return (
    <div className="cont-lose">
      <h2>You Lose!</h2>
      <Scores scores={[...props.scores, props.total]} />
      <div className="cont-lose-btns">
        <Button
          disabled={props.disableSubmit}
          className="start-btn"
          click={props.goValidate}
          value="Submit"
          color="#d9534f"
        />
        <Button
          className="start-btn"
          click={props.updateAndGoHome}
          value="Go Home"
          color="#d9534f"
        />
      </div>
    </div>
  );
}
