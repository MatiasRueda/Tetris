import Board from "../component/Board";
import NextPiece from "../component/NextPiece";
import { useTetris } from "../hook/useTetris";
import "../assets/style/game.css";
import Information from "../component/Information";

export default function Game() {
  const tetris = useTetris();

  return (
    <main className="screen-game">
      <Information {...tetris} />
      <Board board={tetris.board} />
      <NextPiece piece={tetris.nextPiece} />
    </main>
  );
}
