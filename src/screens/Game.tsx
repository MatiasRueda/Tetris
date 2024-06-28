import Board from "../component/Board";
import NextPiece from "../component/NextPiece";
import { useTetris } from "../hook/useTetris";
import "../assets/style/game.css";

export default function Game() {
  const tetris = useTetris();

  return (
    <main className="screen-game">
      <Board board={tetris.board} />
      <NextPiece piece={tetris.nextPiece} />
    </main>
  );
}
