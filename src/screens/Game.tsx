import Board from "../component/Board";
import { useTetris } from "../hook/useTetris";
import Information from "../component/Information";
import NextPieces from "../component/NextPieces";
import "../assets/style/game.css";

export default function Game() {
  const tetris = useTetris();

  return (
    <section className="game">
      <Information {...tetris} />
      <Board board={tetris.board} />
      <NextPieces piece={tetris.nextPiece} pieces={tetris.nextPieces} />
    </section>
  );
}
