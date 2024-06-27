import { useTetris } from "../hook/useTetris";
import "../assets/style/board.css";
import "../assets/style/tetromino.css";
import Piece from "../gameLogic/piece";

export default function Board() {
  const tetris = useTetris();
  return (
    <div className="board-component">
      {tetris.board.map((row) =>
        row.map((column, i) =>
          column === 0 ? (
            <div key={i} className="null-component">
              {i}
            </div>
          ) : (
            <div
              key={i}
              style={{ backgroundColor: (column as Piece).getColor }}
              className="tetromino-component"
            >
              {i}
            </div>
          )
        )
      )}
    </div>
  );
}
