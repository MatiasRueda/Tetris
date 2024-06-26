// rows: 4,
// columns: 4,
// type: "I",
// color: "#ff0000",
// rotateIndex: 0,
//typeRotation: TetrominoesRotation.I[0],

import Piece from "./piece";
import { Shape } from "./type";
import { I as shapes } from "./utils/I";

export default class I extends Piece {
  private shape: Shape;

  constructor(row: number, column: number) {
    super(row, column, 4, 4);
    this.shape = shapes[0];
    this.shapes = shapes;
  }

  public spin(board: (Piece | number)[][]): boolean {
    const result = this.rotate(board);
    if (!result) return false;
    this.shape = result;
    return true;
  }

  get getShape(): Shape {
    return this.shape;
  }
}
