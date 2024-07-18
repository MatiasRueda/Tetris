import BoardController from "./boardController";
import Piece from "./piece";
import PieceFactory from "./pieceFactory";

export default class Tetris {
  private static readonly HEIGHT = 22;
  private static readonly WIDTH = 10;
  private static readonly SCORE_INCREMENT = 10;
  private ctrl = new BoardController(Tetris.HEIGHT, Tetris.WIDTH);
  private board: (string | undefined)[][];
  private factory = new PieceFactory();
  private actPiece = this.factory.randomPiece();
  private nextPiece = this.factory.randomPiece();
  private positionDown: [number, number][] = [];
  private nextPieces: Piece[] = [];
  private level = 1;
  private lines = 0;
  private score = 0;
  private start = false;
  private lose = false;

  constructor() {
    this.board = this.createBoard();
    this.nextPieces.push(this.factory.randomPiece());
    this.nextPieces.push(this.factory.randomPiece());
    this.nextPieces.push(this.factory.randomPiece());
  }

  public startGame() {
    this.spawnTetromino();
    this.start = true;
    this.lose = false;
  }

  private createBoard(): (string | undefined)[][] {
    const board = new Array(Tetris.HEIGHT);
    for (let i = 0; i < Tetris.HEIGHT; i++) {
      board[i] = new Array(Tetris.WIDTH).fill(undefined);
    }
    return board;
  }

  private updateInformation() {
    this.score += Tetris.SCORE_INCREMENT;
    this.lines += 1;
    const isLevelUp = !(this.lines % 10) ? 1 : 0;
    this.level += isLevelUp;
  }

  private clearRow(row: number) {
    this.board.splice(row, 1);
    this.board.unshift(new Array(this.board[0].length).fill(0));
  }

  private removeCurrentPiece() {
    this.actPiece.getPosition.forEach(([row, column]) => {
      this.board[row][column] = undefined;
    });
  }

  private checksSpecificRows(rows: number[]) {
    for (const row of rows) {
      if (!this.board[row].every((cell) => cell)) continue;
      this.clearRow(row);
      this.updateInformation();
    }
  }

  public movePieceToFloor() {
    if (!this.positionDown.length) return;
    const rows = new Set<number>();
    this.removeCurrentPiece();
    this.positionDown.forEach(([row, col]) => {
      this.board[row][col] = this.actPiece.getColor;
      rows.add(row);
    });
    this.checksSpecificRows(Array.from(rows));
    this.spawnNextPieceIfPossible();
  }

  private checkMoveDown() {
    if (!this.positionDown.length) return;
    const [row, _col] = this.positionDown[0];
    const lenPosition = this.actPiece.getPosition.length;
    const [rowPiece, _colPiece] = this.actPiece.getPosition[lenPosition - 1];
    const diference = 2;
    console.log(Math.abs(row - rowPiece));
    if (Math.abs(row - rowPiece) <= diference) this.positionDown = [];
  }

  private setNewPositionDown() {
    const { shape, rowLast, rowLastShape } = this.actPiece.getInformation;
    if (rowLast >= Tetris.HEIGHT) return;
    for (const [rowIndex, _rowBoard] of this.board.entries()) {
      if (rowLast >= rowIndex) continue;
      const positions = this.getPositions(shape, rowIndex, rowLastShape);
      if (positions === null) return;
      this.positionDown = positions;
    }
  }

  private getPositions(shape: number[][], rowIndex: number, rowLast: number) {
    const positions: [number, number][] = [];
    let newRow = rowIndex;
    for (const [rowIndexShape, rowShape] of shape.entries()) {
      if (rowIndexShape > rowLast) continue;
      if (newRow >= Tetris.HEIGHT) return null;
      for (const [colIndexShape, colShape] of rowShape.entries()) {
        if (!colShape) continue;
        const newCol = colIndexShape + this.actPiece.getCurrentColumn;
        if (this.board[newRow][newCol]) return null;
        positions.push([newRow, newCol]);
      }
      newRow += 1;
    }
    return positions;
  }

  public rotate() {
    this.removeCurrentPiece();
    this.actPiece.spin(this.board);
    this.putPiece();
    this.setNewPositionDown();
    this.checkMoveDown();
  }

  public end() {
    this.lose = true;
    this.start = false;
  }

  private checksRows() {
    let { shape, rowIndex } = this.actPiece.getInformation;
    shape.forEach((row, shapeRowIndex) => {
      const actualRow = rowIndex + shapeRowIndex;
      if (this.isRowComplete(actualRow, row)) {
        this.clearRow(actualRow);
        this.updateInformation();
      }
    });
  }

  private isRowComplete(rowIndex: number, row: number[]): boolean {
    if (row.every((col) => !col)) return false;
    return this.board[rowIndex].every((cell) => cell);
  }

  private canAddPiece(piece: Piece): boolean {
    for (const [rowIndex, cols] of piece.getShape.shape.entries()) {
      for (const [colIndex, col] of cols.entries()) {
        if (!col) continue;
        const currentCol = piece.getCurrentColumn + colIndex;
        if (this.board[rowIndex + 2][currentCol]) return false;
      }
    }
    return true;
  }

  private endGame() {
    this.lose = true;
    this.start = false;
  }

  private spawnNextPieceIfPossible() {
    const piece = this.nextPiece;
    if (!this.canAddPiece(piece)) {
      this.endGame();
      return;
    }
    this.spawnTetromino(piece);
  }

  private handlePiecePlacement() {
    this.putPiece();
    this.checksRows();
    this.spawnNextPieceIfPossible();
  }

  public moveDown(): boolean {
    if (!this.start || this.lose) return false;
    this.removeCurrentPiece();
    if (!this.ctrl.moveDown(this.actPiece, this.board)) {
      this.handlePiecePlacement();
      return false;
    }
    this.actPiece.setCurrentRow = 1;
    this.putPiece();
    this.checkMoveDown();
    return true;
  }

  private moveHorizontal(right: boolean) {
    if (!this.start || this.lose) return false;
    if (right && !this.ctrl.moveRight(this.actPiece, this.board)) return false;
    if (!right && !this.ctrl.moveLeft(this.actPiece, this.board)) return false;
    this.removeCurrentPiece();
    this.actPiece.setCurrentColumn = right ? 1 : -1;
    this.putPiece();
    this.setNewPositionDown();
    this.checkMoveDown();
    return true;
  }

  public moveLeft(): boolean {
    return this.moveHorizontal(false);
  }

  public moveRight() {
    return this.moveHorizontal(true);
  }

  private putPiece() {
    let { rowIndex, colIndex } = this.actPiece.getInformation;
    this.actPiece.removeCells();
    this.actPiece.getShape.shape.forEach((row) => {
      row.forEach((col) => {
        if (col && !this.board[rowIndex][colIndex]) {
          this.board[rowIndex][colIndex] = this.actPiece.getColor;
          this.actPiece.addCell(rowIndex, colIndex);
        }
        colIndex += 1;
      });
      rowIndex += 1;
      colIndex = this.actPiece.getCurrentColumn;
    });
  }

  private spawnTetromino(piece?: Piece) {
    this.actPiece = !piece ? this.factory.randomPiece() : piece;
    this.nextPiece = this.nextPieces.shift()!;
    this.nextPieces.push(this.factory.randomPiece());
    this.putPiece();
    this.setNewPositionDown();
    this.checkMoveDown();
  }

  get getInformation() {
    return {
      board: this.board,
      nextPieces: this.nextPieces,
      nextPiece: this.nextPiece,
      level: this.level,
      lines: this.lines,
      score: this.score,
      start: this.start,
      lose: this.lose,
      positionDown: this.positionDown,
    };
  }
}
