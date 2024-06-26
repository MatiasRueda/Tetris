import { Tetrominos } from "./tetromino";
import { Tetromino } from "./type";

export default class Tetris {
  private static readonly HEIGHT = 20;
  private static readonly WIDTH = 10;
  private board: (Tetromino | number)[][];
  private currentTetromino = this.randomTetromino();
  private positionTetromino: number[][] = [];
  private currentRow = 0;
  private currentColumn = 0;

  constructor() {
    this.board = new Array(Tetris.HEIGHT);
    for (let i = 0; i < Tetris.HEIGHT; i++) {
      this.board[i] = new Array(Tetris.WIDTH).fill(0);
    }
    this.nextTetromino();
  }

  private randomTetromino(): Tetromino {
    return Tetrominos.Z;
  }

  private isRowFull(): boolean {
    return true;
  }

  private clearRow(row: number) {
    this.board.splice(row, 1);
    this.board.unshift(new Array(this.board[0].length).fill(0));
  }

  private removeCurrentTetromino() {
    this.positionTetromino.forEach(([row, column]) => {
      this.board[row][column] = 0;
    });
  }

  private canMoveDown() {
    const rowLastIndex = this.currentTetromino.typeRotation.rowLastIndex;
    const lastRow = this.currentRow + rowLastIndex + 1;
    if (lastRow >= Tetris.HEIGHT) return 1;
    let pieceTetromino = 0;
    let pieceNotCollision = 0;
    this.currentTetromino.typeRotation.shape.forEach((row, rowIndex) => {
      const lastRow = this.currentRow + rowIndex + 1;
      row.forEach((col, colIndex) => {
        if (!col) return;
        pieceTetromino += 1;
        const currentCol = this.currentColumn + colIndex;
        if (this.board[lastRow][currentCol]) return;
        pieceNotCollision += 1;
      });
    });
    return pieceTetromino !== pieceNotCollision ? 1 : 0;
  }

  public rotate() {
    this.removeCurrentTetromino();
    this.currentTetromino.rotate(
      Tetris.HEIGHT,
      this.currentRow,
      Tetris.WIDTH,
      this.currentColumn,
      this.board,
      this.currentTetromino
    );
    this.addTetromino();
  }

  public moveTetrominoDown(): boolean {
    this.removeCurrentTetromino();
    if (this.canMoveDown() === 1) {
      this.addTetromino();
      this.nextTetromino();
      return false;
    }
    this.currentRow += 1;
    this.addTetromino();
    return true;
  }

  private canMoveLeft() {
    const rowFirstIndex = this.currentTetromino.typeRotation.rowFirstIndex;
    const rowLastIndex = this.currentTetromino.typeRotation.rowLastIndex;
    const colFirstIndex = this.currentTetromino.typeRotation.columnFirstIndex;
    const firstRow = this.currentRow + rowFirstIndex;
    const lastRow = this.currentRow + rowLastIndex;
    const prevIndex = this.currentColumn + colFirstIndex - 1;
    if (prevIndex < 0) return 1;
    for (let row = firstRow; row <= lastRow; row++) {
      if (row >= Tetris.HEIGHT) {
        return 0;
      }
      if (
        this.board[row][this.currentColumn + colFirstIndex] !== 0 &&
        this.board[row][prevIndex] !== 0
      ) {
        return 1;
      }
    }
    return 0;
  }

  public moveTetrominoLeft(): boolean {
    if (this.canMoveLeft() === 1) return false;
    const fistColumnIndex = this.currentTetromino.typeRotation.columnFirstIndex;
    if (this.currentColumn - 1 + fistColumnIndex < 0) return false;
    this.removeCurrentTetromino();
    this.currentColumn -= 1;
    this.addTetromino();
    return true;
  }

  private canMoveRight() {
    const rowFirstIndex = this.currentTetromino.typeRotation.rowFirstIndex;
    const rowLastIndex = this.currentTetromino.typeRotation.rowLastIndex;
    const colLastIndex = this.currentTetromino.typeRotation.columnLastIndex;
    const firstRow = this.currentRow + rowFirstIndex;
    const lastRow = this.currentRow + rowLastIndex;
    const nextIndex = this.currentColumn + colLastIndex + 1;
    if (nextIndex >= Tetris.WIDTH) return 1;
    for (let row = firstRow; row <= lastRow; row++) {
      if (row >= Tetris.HEIGHT) {
        return 0;
      }
      if (
        this.board[row][this.currentColumn + colLastIndex] !== 0 &&
        this.board[row][nextIndex] !== 0
      ) {
        return 1;
      }
    }
    return 0;
  }

  public moveTetrominoRight() {
    if (this.canMoveRight() === 1) return false;
    this.removeCurrentTetromino();
    this.currentColumn += 1;
    this.addTetromino();
    return true;
  }

  private addTetromino() {
    let rowIndex = this.currentRow;
    let colIndex = this.currentColumn;
    const shape = this.currentTetromino.typeRotation.shape;
    this.positionTetromino = [];
    for (let row = 0; row < this.currentTetromino.rows; row++) {
      for (let col = 0; col < this.currentTetromino.columns; col++) {
        if (shape[row][col] !== 0 && this.board[rowIndex][colIndex] === 0) {
          this.board[rowIndex][colIndex] = this.currentTetromino;
          this.positionTetromino.push([rowIndex, colIndex]);
        }
        colIndex += 1;
      }
      rowIndex += 1;
      colIndex = this.currentColumn;
    }
  }

  public nextTetromino() {
    this.currentRow = 0;
    this.currentColumn = 0;
    this.currentTetromino = this.randomTetromino();
    this.addTetromino();
  }

  get getBoard() {
    return this.board;
  }
}
