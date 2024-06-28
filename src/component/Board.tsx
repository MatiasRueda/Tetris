import { useTetris } from "../hook/useTetris";
import "../assets/style/board.css";
import "../assets/style/tetromino.css";

export default function Board() {
  const tetris = useTetris();
  return (
    <div className="board-component">
      {tetris.board.map((row, rowIndex) => {
        if (!rowIndex || rowIndex === 1) return;
        return row.map((column, columnIndex) =>
          !column ? (
            <div key={columnIndex} className="null-component"></div>
          ) : (
            <div
              key={columnIndex}
              style={{ backgroundColor: column }}
              className="tetromino-component"
            ></div>
          )
        );
      })}
    </div>
  );
}
