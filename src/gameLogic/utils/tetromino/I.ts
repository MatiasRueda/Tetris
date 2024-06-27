import Piece from "../../piece";
import { I as shapes } from "../shape/I";

export default class I extends Piece {
  constructor() {
    super(shapes[0], "#ff0000");
    this.shapes = shapes;
  }
}
