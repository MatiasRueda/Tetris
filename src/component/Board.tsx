import { AnimatePresence } from "framer-motion";
import Cell from "./Cell";
import "../assets/style/tetromino.css";
import "../assets/style/board.css";

export default function Board(props: {
  last: [number, number][];
  board: (string | undefined)[][];
}) {
  return (
    <section className="board">
      {props.board.map((row, rowIndex) => {
        if (!rowIndex || rowIndex === 1) return null;
        return row.map((column, columnIndex) =>
          props.last.some(
            ([row, col]) => row === rowIndex && col === columnIndex
          ) ? (
            !column ? (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className="cont-cell"
                style={{ borderColor: "white" }}
              />
            ) : (
              <div
                key={`${rowIndex}-${columnIndex}`}
                color={column}
                className="cont-cell"
                style={{ backgroundColor: column }}
              />
            )
          ) : (
            <div
              key={`${rowIndex}-${columnIndex}`}
              color={column}
              className="cont-cell"
              style={{ backgroundColor: column }}
            />
          )
        );
      })}
    </section>
  );
}
