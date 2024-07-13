import Button from "./Button";
import "../assets/style/controller.css";
import TextController from "./TextController";
import TextRules from "./TextRules";

export default function Controllers(props: { startGame: () => void }) {
  return (
    <section className="controller">
      <div className="cont-controller">
        <div className="cont-texts">
          <TextRules />
          <TextController />
        </div>
        <Button class="start-btn" click={props.startGame} value="Start" />
      </div>
    </section>
  );
}
