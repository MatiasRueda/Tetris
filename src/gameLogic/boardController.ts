import Piece from "./piece";
import { PieceInfo } from "./utils/type/type";

type Cell = string | undefined;

export default class BoardController {
  private height: number;
  private width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }

  private getPieceInfo(piece: Piece, right: boolean) {
    const { columnFirstIndex, columnLastIndex, rowFirstIndex, rowLastIndex } =
      piece.getShape;
    const column = right ? columnLastIndex : columnFirstIndex;
    const index = piece.getCurrentColumn + column + (right ? 1 : -1);
    return {
      firstRow: piece.getCurrentRow + rowFirstIndex,
      lastRow: piece.getCurrentRow + rowLastIndex,
      column,
      index,
    };
  }

  private iterRow(pieceInfo: PieceInfo, board: Cell[][], column: number) {
    for (let row = pieceInfo.firstRow; row <= pieceInfo.lastRow; row++) {
      if (row >= this.height) return true;
      if (board[row][column] && board[row][pieceInfo.index]) return false;
    }
    return true;
  }

  private canMove(piece: Piece, board: Cell[][], right: boolean) {
    const pieceInfo = this.getPieceInfo(piece, right);
    if (right && pieceInfo.index >= this.width) return false;
    if (!right && pieceInfo.index < 0) return false;
    const column = piece.getCurrentColumn + pieceInfo.column;
    return this.iterRow(pieceInfo, board, column);
  }

  public canMoveRight(piece: Piece, board: Cell[][]) {
    return this.canMove(piece, board, true);
  }

  public canMoveLeft(piece: Piece, board: Cell[][]) {
    return this.canMove(piece, board, false);
  }
}
