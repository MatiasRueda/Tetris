import Board from "../component/Board";
import { useTetris } from "../hook/useTetris";
import Information from "../component/Information";
import NextPieces from "../component/NextPieces";
import Controllers from "../component/Controllers";
import Lose from "../component/Lose";
import "../assets/style/game.css";
import { useConfigContext } from "../context/ConfigContext";

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
      {!tetris.info.start && !tetris.info.lose && (
        <Controllers startGame={tetris.startGame} />
      )}
      {tetris.info.lose && <Lose />}
    </section>
  );
}
