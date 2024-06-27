import Piece from "../../piece";
import { Z as shapes } from "../shape/Z";

export default class Z extends Piece {
  constructor() {
    super(shapes[0], "#800080");
    this.shapes = shapes;
  }
}
