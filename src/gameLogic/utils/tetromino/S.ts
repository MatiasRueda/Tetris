import Piece from "../../piece";
import { S as shapes } from "../shape/S";

export default class S extends Piece {
  constructor() {
    super(shapes[0], "#0000ff");
    this.shapes = shapes;
  }
}
