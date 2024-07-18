import Piece from "./piece";
export default class BoardController {
  private height: number;
  private width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }

  public canMoveRight(piece: Piece, board: (string | undefined)[][]) {
    const rowFirstIndex = piece.getShape.rowFirstIndex;
    const rowLastIndex = piece.getShape.rowLastIndex;
    const colLastIndex = piece.getShape.columnLastIndex;
    const firstRow = piece.getCurrentRow + rowFirstIndex;
    const lastRow = piece.getCurrentRow + rowLastIndex;
    const nextIndex = piece.getCurrentColumn + colLastIndex + 1;
    if (nextIndex >= this.width) return false;
    for (let row = firstRow; row <= lastRow; row++) {
      if (row >= this.height) return true;
      const currentCol = piece.getCurrentColumn + colLastIndex;
      if (board[row][currentCol] && board[row][nextIndex]) return false;
    }
    return true;
  }

  public canMoveLeft(piece: Piece, board: (string | undefined)[][]) {
    const rowFirstIndex = piece.getShape.rowFirstIndex;
    const rowLastIndex = piece.getShape.rowLastIndex;
    const colFirstIndex = piece.getShape.columnFirstIndex;
    const firstRow = piece.getCurrentRow + rowFirstIndex;
    const lastRow = piece.getCurrentRow + rowLastIndex;
    const prevIndex = piece.getCurrentColumn + colFirstIndex - 1;
    if (prevIndex < 0) return false;
    for (let row = firstRow; row <= lastRow; row++) {
      if (row >= this.height) return true;
      const currentCol = piece.getCurrentColumn + colFirstIndex;
      if (board[row][currentCol] && board[row][prevIndex]) return false;
    }
    return true;
  }
}
