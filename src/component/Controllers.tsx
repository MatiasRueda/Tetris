import Button from "./Button";
import TextController from "./TextController";
import TextRules from "./TextRules";
import "../assets/style/controller.css";

export default function Controllers(props: { startGame: () => void }) {
  return (
    <section className="controller">
      <div className="cont-controller">
        <div className="cont-texts">
          <TextRules />
          <TextController />
        </div>
        <Button
          className="start-btn common-btn"
          click={props.startGame}
          value="Start"
          color="#00796b"
        />
      </div>
    </section>
  );
}
