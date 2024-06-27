import Piece from "./piece";
import { Tetromino } from "./tetromino";
import I from "./utils/tetromino/I";
import J from "./utils/tetromino/J";
import L from "./utils/tetromino/L";
import O from "./utils/tetromino/O";
import S from "./utils/tetromino/S";
import T from "./utils/tetromino/T";
import Z from "./utils/tetromino/Z";

export default class PieceFactory {
  private static createPiece(tetromino: Tetromino): Piece {
    const pieces = {
      [Tetromino.I]: () => new I(),
      [Tetromino.J]: () => new J(),
      [Tetromino.L]: () => new L(),
      [Tetromino.O]: () => new O(),
      [Tetromino.S]: () => new S(),
      [Tetromino.T]: () => new T(),
      [Tetromino.Z]: () => new Z(),
    };
    return pieces[tetromino]();
  }

  public getRandomPiece(): Piece {
    const enumValues = Object.values(Tetromino).filter(
      (value) => typeof value === "number"
    ) as Tetromino[];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomTetromino = enumValues[randomIndex];

    return PieceFactory.createPiece(randomTetromino);
  }
}
