import Piece from "../gameLogic/piece";
import NextPiece from "./NextPiece";
import "../assets/style/nextPieces.css";

export default function NextPieces(props: { piece: Piece; pieces: Piece[] }) {
  return (
    <section className="next-pieces">
      <div className="cont-info-next-piece">
        <h3>Next piece:</h3>
        <NextPiece piece={props.piece} />
      </div>
      <div className="cont-info-next-pieces">
        {props.pieces.map((piece, index) => (
          <NextPiece key={index} piece={piece} />
        ))}
      </div>
    </section>
  );
}
