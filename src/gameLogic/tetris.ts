import { Tetrominos } from "./tetromino";
import { Tetromino } from "./type";

export default class Tetris {
  private static readonly HEIGHT = 20;
  private static readonly WIDTH = 10;
  private board: number[][];
  private currentTetromino = this.randomTetromino();
  private currentRow = 0;
  private currentColumn = 0;

  constructor() {
    this.board = new Array(Tetris.HEIGHT);
    for (let i = 0; i < Tetris.HEIGHT; i++) {
      this.board[i] = new Array(Tetris.WIDTH).fill(0);
    }
    this.nextTetromino();
  }

  private randomColor() {}

  private randomTetromino(): Tetromino {
    return Tetrominos.I;
  }

  private isRowFull(): boolean {
    return true;
  }

  private clearRow(row: number) {
    this.board.splice(row, 1);
    this.board.unshift(new Array(this.board[0].length).fill(0));
  }

  private removeCurrentTetromino() {
    let rowIndex = this.currentRow;
    let colIndex = this.currentColumn;
    const rowLastIndex = this.currentTetromino.typeRotation.rowLastIndex;
    const colLastIndex = this.currentTetromino.typeRotation.columnLastIndex;
    for (let row = 0; row <= rowLastIndex; row++) {
      for (let col = 0; col <= colLastIndex; col++) {
        this.board[rowIndex][colIndex] = 0;
        colIndex += 1;
      }
      rowIndex += 1;
      colIndex = this.currentColumn;
    }
  }

  private canMoveDown(): boolean {
    const rowFirstIndex = this.currentTetromino.typeRotation.rowFirstIndex;
    const rowLastIndex = this.currentTetromino.typeRotation.rowLastIndex;
    const colFirstIndex = this.currentTetromino.typeRotation.columnFirstIndex;
    const colLastIndex = this.currentTetromino.typeRotation.columnLastIndex;
    const lastRow = this.currentRow + rowLastIndex + 1;
    if (lastRow >= Tetris.HEIGHT) return false;
    for (let row = rowFirstIndex + 1; row <= rowLastIndex; row++) {
      const currentRow = this.currentRow + row;
      if (currentRow >= Tetris.HEIGHT) return false;
      for (let col = colFirstIndex + 1; col <= colLastIndex; col++) {
        const colIndex = this.currentColumn + colLastIndex + col;
        if (colIndex >= Tetris.WIDTH || this.board[currentRow][colIndex] == 1) {
          return false;
        }
      }
    }
    return true;
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
    if (!this.canMoveDown()) return false;
    this.removeCurrentTetromino();
    this.currentRow += 1;
    this.addTetromino();
    return true;
  }

  public moveTetrominoLeft(): boolean {
    const fistColumnIndex = this.currentTetromino.typeRotation.columnFirstIndex;
    if (this.currentColumn - 1 + fistColumnIndex < 0) return false;
    this.removeCurrentTetromino();
    this.currentColumn -= 1;
    this.addTetromino();
    return true;
  }

  public moveTetrominoRight() {
    const width = this.currentTetromino.typeRotation.columnLastIndex;
    if (this.currentColumn + width >= Tetris.WIDTH - 1) return false;
    this.removeCurrentTetromino();
    this.currentColumn += 1;
    this.addTetromino();
    return true;
  }

  private addTetromino() {
    let rowIndex = this.currentRow;
    let colIndex = this.currentColumn;
    const shape = this.currentTetromino.typeRotation.shape;
    for (let row = 0; row < this.currentTetromino.rows; row++) {
      for (let col = 0; col < this.currentTetromino.columns; col++) {
        if (shape[row][col] !== 0 && this.board[rowIndex][colIndex] === 0) {
          this.board[rowIndex][colIndex] = 1;
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
