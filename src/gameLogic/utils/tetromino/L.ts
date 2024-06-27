import Piece from "../../piece";
import { L as shapes } from "../shape/L";

export default class L extends Piece {
  constructor() {
    super(shapes[0], "#87ceeb");
    this.shapes = shapes;
  }
}
