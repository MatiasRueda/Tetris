import { Shape } from "./type";

export default abstract class Piece {
  private readonly ROWS: number;
  private readonly COLUMNS: number;
  private rotateIndex: number = 0;
  private positionCells: number[][] = [];
  protected shapes: Shape[] = [];
  protected currentRow: number;
  protected currentColumn: number;

  constructor(row: number, rows: number, columns: number, column: number) {
    this.currentRow = row;
    this.currentColumn = column;
    this.ROWS = rows;
    this.COLUMNS = columns;
  }

  abstract spin(board: (Piece | number)[][]): boolean;

  abstract get getShape(): Shape;

  private nextIndex(currentIndex: number, maxIndex: number): number {
    return currentIndex + 1 >= maxIndex ? 0 : currentIndex + 1;
  }

  private collision(
    board: (Piece | number)[][],
    rows: number,
    cols: number
  ): boolean {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (board[row][col] == 1) {
          return true;
        }
      }
    }
    return false;
  }

  protected rotate(board: (Piece | number)[][]): Shape | undefined {
    const maxRow = board.length;
    const maxCol = board[0].length;
    const currentShape = this.shapes[this.rotateIndex];
    const newRotateIndex = this.nextIndex(this.rotateIndex, 4);
    const newShape = this.shapes[newRotateIndex];
    if (
      this.collision(board, newShape.rowLastIndex, newShape.columnLastIndex)
    ) {
      return undefined;
    } else if (
      this.COLUMNS + this.currentColumn > maxCol &&
      currentShape.columnLastIndex < newShape.columnLastIndex
    ) {
      return undefined;
    } else if (
      this.currentColumn < 0 &&
      this.currentColumn + this.COLUMNS >= 0 &&
      currentShape.columnFirstIndex > newShape.columnFirstIndex
    ) {
      return undefined;
    } else if (
      this.ROWS + this.currentRow > maxRow &&
      currentShape.rowLastIndex < newShape.rowLastIndex
    ) {
      return undefined;
    }
    this.rotateIndex = newRotateIndex;
    return newShape;
  }

  public addCell(row: number, column: number) {
    this.positionCells.push([row, column]);
  }

  public removeCells() {
    this.positionCells = [];
  }

  set setCurrentRow(n: 1 | -1) {
    this.currentRow += n;
  }

  set setCurrentColumn(n: 1 | -1) {
    this.currentColumn += n;
  }

  get getPosition() {
    return this.positionCells;
  }

  get getRows() {
    return this.ROWS;
  }

  get getColumns() {
    return this.COLUMNS;
  }

  get getCurrentRow() {
    return this.currentRow;
  }

  get getCurrentColumn() {
    return this.currentColumn;
  }
}
