import "../assets/style/board.css";
import "../assets/style/tetromino.css";

export default function Board(props: { board: (string | undefined)[][] }) {
  return (
    <section className="board">
      {props.board.map((row, rowIndex) => {
        if (!rowIndex || rowIndex === 1) return;
        return row.map((column, columnIndex) =>
          !column ? (
            <div key={columnIndex} className="cont-null"></div>
          ) : (
            <div
              key={columnIndex}
              style={{ backgroundColor: column }}
              className="cont-tetromino"
            ></div>
          )
        );
      })}
    </section>
  );
}
