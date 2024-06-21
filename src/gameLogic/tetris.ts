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
    for (let row = 0; row < this.currentTetromino.rows; row++) {
      for (let col = 0; col < this.currentTetromino.columns; col++) {
        this.board[rowIndex][colIndex] = 0;
        colIndex += 1;
      }
      rowIndex += 1;
      colIndex = 0;
    }
  }

  private canMoveDown(): boolean {
    let rowIndex = this.currentRow + 1;
    let colIndex = this.currentColumn;
    for (let row = 0; row < this.currentTetromino.rows; row++) {
      if (rowIndex <= Tetris.HEIGHT || this.board[rowIndex][colIndex] == 1) {
        return false;
      }
      for (let col = 0; col < this.currentTetromino.columns; col++) {
        if (colIndex <= Tetris.WIDTH || this.board[rowIndex][colIndex] == 1) {
          return false;
        }
        colIndex += 1;
      }
      rowIndex += 1;
      colIndex = 0;
    }
    return true;
  }

  public moveTetrominoDown(): boolean {
    if (!this.canMoveDown()) return false;
    this.removeCurrentTetromino();
    this.currentRow += 1;
    this.addTetromino();
    console.log(this.board);
    return true;
  }

  public moveTetrominoLeft() {}

  public moveTetrominoRight() {}

  private addTetromino() {
    let rowIndex = this.currentRow;
    let colIndex = this.currentColumn;
    const shape = this.currentTetromino.typeRotation.shape;
    for (let row = 0; row < this.currentTetromino.rows; row++) {
      for (let col = 0; col < this.currentTetromino.columns; col++) {
        if (shape[row][col] !== 0 && this.board[rowIndex][colIndex] === 0) {
          this.board[rowIndex][colIndex] = 1;
          colIndex += 1;
        }
      }
      rowIndex += 1;
      colIndex = 0;
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
