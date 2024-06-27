import Piece from "../../piece";
import { T as shapes } from "../shape/T";

export default class T extends Piece {
  constructor() {
    super(shapes[0], "#ffc0cb");
    this.shapes = shapes;
  }
}
