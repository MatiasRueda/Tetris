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
        if (!rowIndex || rowIndex === 1) return;
        return row.map((column, columnIndex) => (
          <AnimatePresence key={`${rowIndex}-${columnIndex}`}>
            {props.last.some(
              ([row, col]) => row === rowIndex && col === columnIndex
            ) ? (
              !column ? (
                <div className="cont-cell" style={{ borderColor: "white" }} />
              ) : (
                <Cell color={column} />
              )
            ) : (
              <Cell color={column} />
            )}
          </AnimatePresence>
        ));
      })}
    </section>
  );
}
