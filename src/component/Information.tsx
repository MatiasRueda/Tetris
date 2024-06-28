import "../assets/style/information.css";
import Stadistic from "./Stadistic";

type Parameters = {
  level: number;
  score: number;
  lines: number;
};

export default function Information({ ...rest }: Parameters) {
  return (
    <section className="information">
      <Stadistic class="cont-score" stadistic="Score" value={rest.score} />
      <Stadistic class="cont-line" stadistic="Line Clears" value={rest.lines} />
      <Stadistic class="cont-level" stadistic="Level" value={rest.level} />
    </section>
  );
}
