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
    const shape = this.currentTetromino.typeRotation.shape;
    const rowLastIndex = this.currentTetromino.typeRotation.rowLastIndex;
    const colLastIndex = this.currentTetromino.typeRotation.columnLastIndex;
    for (let row = 0; row <= rowLastIndex; row++) {
      for (let col = 0; col <= colLastIndex; col++) {
        if (this.board[rowIndex][colIndex] === 1 && shape[row][col] === 1) {
          this.board[rowIndex][colIndex] = 0;
        }
        colIndex += 1;
      }
      rowIndex += 1;
      colIndex = this.currentColumn;
    }
  }

  private canMoveDown() {
    // const rowFirstIndex = this.currentTetromino.typeRotation.rowFirstIndex;
    const rowLastIndex = this.currentTetromino.typeRotation.rowLastIndex;
    const colFirstIndex = this.currentTetromino.typeRotation.columnFirstIndex;
    const colLastIndex = this.currentTetromino.typeRotation.columnLastIndex;
    const lastRow = this.currentRow + rowLastIndex + 1;
    const firstCol = this.currentColumn + colFirstIndex;
    const lastCol = this.currentColumn + colLastIndex;
    // console.log("El row first index es: ", rowFirstIndex);
    // console.log("El row last index es: ", rowLastIndex);
    // console.log("El col first index es: ", colFirstIndex);
    // console.log("El col last index es: ", colLastIndex);
    // console.log("El last row es: ", lastRow);
    // console.log("La first col es: ", firstCol);
    // console.log("El current col es: ", this.currentColumn);
    if (lastRow >= Tetris.HEIGHT || this.board[lastRow][firstCol] == 1) {
      //console.log("Aca");
      return 1;
    }
    for (let col = firstCol; col <= lastCol; col++) {
      // const colIndex = this.currentColumn + col;
      // console.log("Me estoy fijando en la columna: ", col);
      if (col >= Tetris.WIDTH) {
        // console.log("El current col es: ", this.currentColumn);
        // console.log("El col es: ", col);
        // console.log("El col index es: ", colIndex);
        // console.log("El indice es mayor o igual al largo");
        return 0;
      }
      if (this.board[lastRow][col] == 1) {
        // console.log("El hay colision");
        return 1;
      }
    }
    return 0;
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
    if (this.canMoveDown() === 1) {
      this.nextTetromino();
      return false;
    }
    this.removeCurrentTetromino();
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
        this.board[row][this.currentColumn + colFirstIndex] === 1 &&
        this.board[row][prevIndex] === 1
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
    console.log(nextIndex);
    if (nextIndex >= Tetris.WIDTH) return 1;
    for (let row = firstRow; row <= lastRow; row++) {
      if (row >= Tetris.HEIGHT) {
        return 0;
      }
      if (
        this.board[row][this.currentColumn + colLastIndex] === 1 &&
        this.board[row][nextIndex] === 1
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
