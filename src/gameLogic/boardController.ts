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

  private move(piece: Piece, board: Cell[][], right: boolean) {
    const pieceInfo = this.getPieceInfo(piece, right);
    if (right && pieceInfo.index >= this.width) return false;
    if (!right && pieceInfo.index < 0) return false;
    const column = piece.getCurrentColumn + pieceInfo.column;
    return this.iterRow(pieceInfo, board, column);
  }

  public moveRight(piece: Piece, board: Cell[][]) {
    return this.move(piece, board, true);
  }

  public moveLeft(piece: Piece, board: Cell[][]) {
    return this.move(piece, board, false);
  }

  private isWithinBounds(row: number) {
    return row < this.height;
  }

  private countPieceCollisions(piece: Piece, board: Cell[][]) {
    let tetrominoCount = 0;
    let collisionCount = 0;

    piece.getShape.shape.forEach((row, rowIndex) => {
      const currentRow = piece.getCurrentRow + rowIndex + 1;
      row.forEach((col, colIndex) => {
        if (!col) return;
        tetrominoCount += 1;
        const currentCol = piece.getCurrentColumn + colIndex;
        if (!board[currentRow][currentCol]) collisionCount += 1;
      });
    });

    return { tetrominoCount, collisionCount };
  }

  public moveDown(piece: Piece, board: Cell[][]): boolean {
    const rowLastIndex = piece.getShape.rowLastIndex;
    const lastRow = piece.getCurrentRow + rowLastIndex + 1;
    if (!this.isWithinBounds(lastRow)) return false;
    const { tetrominoCount, collisionCount } = this.countPieceCollisions(
      piece,
      board
    );
    return tetrominoCount === collisionCount;
  }
}
