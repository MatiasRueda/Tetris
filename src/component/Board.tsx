import "../assets/style/board.css";

import { useTetris } from "../hook/useTetris";

export default function Board() {
  const tetris = useTetris();
  console.log(tetris.board);
  return <div className="board-component"></div>;
}
