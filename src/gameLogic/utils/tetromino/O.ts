import Piece from "../../piece";
import { O as shapes } from "../shape/O";

export default class O extends Piece {
  constructor() {
    super(shapes[0], "#ffa500");
    this.shapes = shapes;
  }
}
