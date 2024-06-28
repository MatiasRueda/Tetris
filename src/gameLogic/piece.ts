import { Shape } from "./type";

export default class Piece {
  private readonly ROWS: number;
  private readonly COLUMNS: number;
  private rotateIndex: number = 0;
  private positionCells: number[][] = [];
  private color: string;
  protected shape: Shape;
  protected shapes: Shape[] = [];
  protected currentRow: number = 0;
  protected currentColumn: number = 3;

  constructor(shape: Shape, color: string) {
    this.shape = shape;
    this.ROWS = shape.shape.length;
    this.COLUMNS = shape.shape[0].length;
    this.color = color;
  }

  private nextIndex(currentIndex: number, maxIndex: number): number {
    return currentIndex + 1 >= maxIndex ? 0 : currentIndex + 1;
  }

  get getColor() {
    return this.color;
  }

  private collision(board: (string | undefined)[][], shape: Shape) {
    let pieceTetromino = 0;
    let pieceNotCollision = 0;
    shape.shape.forEach((row, rowIndex) => {
      const lastRow = this.currentRow + rowIndex;
      row.forEach((col, colIndex) => {
        if (!col) return;
        pieceTetromino += 1;
        const currentCol = this.currentColumn + colIndex;
        if (board[lastRow][currentCol]) return;
        pieceNotCollision += 1;
      });
    });
    return pieceTetromino !== pieceNotCollision;
  }

  protected rotate(board: (string | undefined)[][]): Shape | undefined {
    const maxRow = board.length;
    const maxCol = board[0].length;
    const currentShape = this.shapes[this.rotateIndex];
    const newRotateIndex = this.nextIndex(this.rotateIndex, 4);
    const newShape = this.shapes[newRotateIndex];
    if (this.collision(board, newShape)) {
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

  public spin(board: (string | undefined)[][]): boolean {
    const result = this.rotate(board);
    if (!result) return false;
    this.shape = result;
    return true;
  }

  get getShape(): Shape {
    return this.shape;
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
