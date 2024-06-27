import Piece from "../../piece";
import { J as shapes } from "../shape/J";

export default class J extends Piece {
  constructor() {
    super(shapes[0], "#008000");
    this.shapes = shapes;
  }
}
