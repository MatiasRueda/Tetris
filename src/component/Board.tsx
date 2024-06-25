import { useTetris } from "../hook/useTetris";
import "../assets/style/board.css";
import "../assets/style/tetromino.css";
import { Tetromino } from "../gameLogic/type";

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
              style={{ backgroundColor: (column as Tetromino).color }}
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
