import { useTetris } from "../hook/useTetris";
import "../assets/style/board.css";
import "../assets/style/tetromino.css";
import Piece from "../gameLogic/piece";

export default function Board() {
  const tetris = useTetris();
  return (
    <div className="board-component">
      {tetris.board.map((row, rowIndex) => {
        if (!rowIndex || rowIndex === 1)
          return <div style={{ backgroundColor: "rgb(105, 105, 214)s" }}></div>;
        return row.map((column, columnIndex) =>
          column === 0 ? (
            <div key={columnIndex} className="null-component"></div>
          ) : (
            <div
              key={columnIndex}
              style={{ backgroundColor: (column as Piece).getColor }}
              className="tetromino-component"
            ></div>
          )
        );
      })}
    </div>
  );
}
