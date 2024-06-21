import { useTetris } from "../hook/useTetris";
import "../assets/style/board.css";
import "../assets/style/tetromino.css";

export default function Board() {
  const tetris = useTetris();
  return (
    <div className="board-component">
      {tetris.board.map((row) =>
        row.map((column, i) =>
          column === 1 ? (
            <div key={i} className="tetromino-component">
              {i}
            </div>
          ) : (
            <div key={i} className="null-component">
              {i}
            </div>
          )
        )
      )}
    </div>
  );
}
