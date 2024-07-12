import Board from "../component/Board";
import { useTetris } from "../hook/useTetris";
import Information from "../component/Information";
import NextPieces from "../component/NextPieces";
import "../assets/style/game.css";

export default function Game() {
  const tetris = useTetris();

  return (
    <section className="game">
      <Information {...tetris.info} />
      <Board board={tetris.info.board} />
      <NextPieces
        piece={tetris.info.nextPiece}
        pieces={tetris.info.nextPieces}
      />
    </section>
  );
}
