import Button from "./Button";
import "../assets/style/pause.css";

export default function Pause(props: { resume: () => void }) {
  return (
    <section className="pause">
      <div className="cont-pause">
        <h1>Pause</h1>
        <Button click={props.resume} class={"resume-btn"} value={"Resume"} />
      </div>
    </section>
  );
}
