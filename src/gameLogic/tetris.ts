import Piece from "./piece";
import PieceFactory from "./pieceFactory";

export default class Tetris {
  private static readonly HEIGHT = 22;
  private static readonly WIDTH = 10;
  private board: (Piece | number)[][];
  private factory = new PieceFactory();
  private currentPiece = this.factory.getRandomPiece();

  constructor() {
    this.board = this.createBoard();
    this.spawnTetromino();
  }

  private createBoard(): (Piece | number)[][] {
    const board = new Array(Tetris.HEIGHT);
    for (let i = 0; i < Tetris.HEIGHT; i++) {
      board[i] = new Array(Tetris.WIDTH).fill(0);
    }
    return board;
  }

  private clearRow(row: number) {
    this.board.splice(row, 1);
    this.board.unshift(new Array(this.board[0].length).fill(0));
  }

  private removeCurrentPiece() {
    this.currentPiece.getPosition.forEach(([row, column]) => {
      this.board[row][column] = 0;
    });
  }

  private canMoveDown() {
    const rowLastIndex = this.currentPiece.getShape.rowLastIndex;
    const lastRow = this.currentPiece.getCurrentRow + rowLastIndex + 1;
    if (lastRow >= Tetris.HEIGHT) return 1;
    let pieceTetromino = 0;
    let pieceNotCollision = 0;
    this.currentPiece.getShape.shape.forEach((row, rowIndex) => {
      const lastRow = this.currentPiece.getCurrentRow + rowIndex + 1;
      row.forEach((col, colIndex) => {
        if (!col) return;
        pieceTetromino += 1;
        const currentCol = this.currentPiece.getCurrentColumn + colIndex;
        if (this.board[lastRow][currentCol]) return;
        pieceNotCollision += 1;
      });
    });
    return pieceTetromino !== pieceNotCollision ? 1 : 0;
  }

  public rotate() {
    this.removeCurrentPiece();
    this.currentPiece.spin(this.board);
    this.addTetromino();
  }

  private checksRows() {
    this.currentPiece.getShape.shape.forEach((row, rowIndex) => {
      const currentRow = this.currentPiece.getCurrentRow + rowIndex;
      for (const col of row) {
        if (!col) continue;
        const rowComplete = this.board[currentRow].every((e) => e);
        if (!rowComplete) break;
        this.clearRow(currentRow);
        break;
      }
    });
  }

  public moveTetrominoDown(): boolean {
    this.removeCurrentPiece();
    if (this.canMoveDown() === 1) {
      this.addTetromino();
      this.checksRows();
      this.spawnTetromino();
      return false;
    }
    this.currentPiece.setCurrentRow = 1;
    this.addTetromino();
    return true;
  }

  private canMoveLeft() {
    const rowFirstIndex = this.currentPiece.getShape.rowFirstIndex;
    const rowLastIndex = this.currentPiece.getShape.rowLastIndex;
    const colFirstIndex = this.currentPiece.getShape.columnFirstIndex;
    const firstRow = this.currentPiece.getCurrentRow + rowFirstIndex;
    const lastRow = this.currentPiece.getCurrentRow + rowLastIndex;
    const prevIndex = this.currentPiece.getCurrentColumn + colFirstIndex - 1;
    if (prevIndex < 0) return 1;
    for (let row = firstRow; row <= lastRow; row++) {
      if (row >= Tetris.HEIGHT) return 0;
      const currentCol = this.currentPiece.getCurrentColumn + colFirstIndex;
      if (this.board[row][currentCol] && this.board[row][prevIndex]) return 1;
    }
    return 0;
  }

  public moveTetrominoLeft(): boolean {
    if (this.canMoveLeft() === 1) return false;
    const fistColumnIndex = this.currentPiece.getShape.columnFirstIndex;
    if (this.currentPiece.getCurrentColumn - 1 + fistColumnIndex < 0)
      return false;
    this.removeCurrentPiece();
    this.currentPiece.setCurrentColumn = -1;
    this.addTetromino();
    return true;
  }

  private canMoveRight() {
    const rowFirstIndex = this.currentPiece.getShape.rowFirstIndex;
    const rowLastIndex = this.currentPiece.getShape.rowLastIndex;
    const colLastIndex = this.currentPiece.getShape.columnLastIndex;
    const firstRow = this.currentPiece.getCurrentRow + rowFirstIndex;
    const lastRow = this.currentPiece.getCurrentRow + rowLastIndex;
    const nextIndex = this.currentPiece.getCurrentColumn + colLastIndex + 1;
    if (nextIndex >= Tetris.WIDTH) return 1;
    for (let row = firstRow; row <= lastRow; row++) {
      if (row >= Tetris.HEIGHT) return 0;
      const currentCol = this.currentPiece.getCurrentColumn + colLastIndex;
      if (this.board[row][currentCol] && this.board[row][nextIndex]) return 1;
    }
    return 0;
  }

  public moveTetrominoRight() {
    if (this.canMoveRight() === 1) return false;
    this.removeCurrentPiece();
    this.currentPiece.setCurrentColumn = 1;
    this.addTetromino();
    return true;
  }

  private addTetromino() {
    let rowIndex = this.currentPiece.getCurrentRow;
    let colIndex = this.currentPiece.getCurrentColumn;
    const shape = this.currentPiece.getShape;
    this.currentPiece.removeCells();
    for (let row = 0; row < this.currentPiece.getRows; row++) {
      for (let col = 0; col < this.currentPiece.getColumns; col++) {
        if (shape.shape[row][col] && !this.board[rowIndex][colIndex]) {
          this.board[rowIndex][colIndex] = this.currentPiece;
          this.currentPiece.addCell(rowIndex, colIndex);
        }
        colIndex += 1;
      }
      rowIndex += 1;
      colIndex = this.currentPiece.getCurrentColumn;
    }
  }

  private spawnTetromino() {
    this.currentPiece = this.factory.getRandomPiece();
    this.addTetromino();
  }

  get getBoard() {
    return this.board;
  }
}
