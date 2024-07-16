import Board from "../component/Board";
import useTetris from "../hook/useTetris";
import Information from "../component/Information";
import NextPieces from "../component/NextPieces";
import Controllers from "../component/Controllers";
import Lose from "../component/Lose";
import { useConfigContext } from "../context/ConfigContext";
import Pause from "../component/Pause";
import "../assets/style/game.css";

export default function Game() {
  const config = useConfigContext();
  const tetris = useTetris(config.difficulty);

  return (
    <section className="game">
      <Information {...tetris.info} />
      <Board board={tetris.info.board} />
      <NextPieces
        piece={tetris.info.nextPiece}
        pieces={tetris.info.nextPieces}
      />

      {tetris.pause && tetris.info.start && !tetris.info.lose && (
        <Pause resume={tetris.resume} />
      )}
      {!tetris.info.start && !tetris.info.lose && (
        <Controllers startGame={tetris.startGame} />
      )}
      {tetris.info.lose && (
        <Lose difficulty={config.difficulty} {...tetris.info} />
      )}
    </section>
  );
}
