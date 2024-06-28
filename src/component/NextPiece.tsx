import Piece from "../gameLogic/piece";
import "../assets/style/nextPiece.css";

export default function NextPiece(props: { piece: Piece }) {
  const firstIndex = props.piece.getShape.rowFirstIndex;
  const lastIndex = props.piece.getShape.rowLastIndex;

  return (
    <div className="cont-next-piece">
      {props.piece.getShape.shape.map((row, index) => {
        if (index < firstIndex || index > lastIndex) return;
        return (
          <div
            key={index}
            className="cont-row-piece"
            style={{ width: `${props.piece.getColumns * 2.5}rem` }}
          >
            {row.map((e, index) =>
              !e ? (
                <div key={index} className="cont-empty"></div>
              ) : (
                <div
                  key={index}
                  className="cont-tetromino"
                  style={{ backgroundColor: props.piece.getColor }}
                ></div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
