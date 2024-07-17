import Piece from "./piece";
import PieceFactory from "./pieceFactory";

export default class Tetris {
  private static readonly HEIGHT = 22;
  private static readonly WIDTH = 10;
  private static readonly SCORE_INCREMENT = 10;
  private board: (string | undefined)[][];
  private factory = new PieceFactory();
  private currentPiece = this.factory.randomPiece();
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
    this.setNewPositionDown();
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
    this.currentPiece.getPosition.forEach(([row, column]) => {
      this.board[row][column] = undefined;
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

  private setNewPositionDown() {
    const shape = this.currentPiece.getShape.shape;
    const rowLastIndex = this.currentPiece.getShape.rowLastIndex;
    let lastRow = this.currentPiece.getCurrentRow + rowLastIndex;
    if (lastRow >= Tetris.HEIGHT) return;
    for (const [rowIndex, rowBoard] of this.board.entries()) {
      if (lastRow >= rowIndex) continue;
      const positions: [number, number][] = [];
      let newRow = rowIndex;
      for (const [rowIndexShape, rowShape] of shape.entries()) {
        if (rowIndexShape > rowLastIndex) continue;
        if (newRow >= Tetris.HEIGHT) return;
        for (const [colIndexShape, colShape] of rowShape.entries()) {
          if (!colShape) continue;
          const newCol = colIndexShape + this.currentPiece.getCurrentColumn;
          if (this.board[newRow][newCol]) return;
          positions.push([newRow, newCol]);
        }
        newRow += 1;
      }
      this.positionDown = positions;
    }
  }

  public rotate() {
    this.removeCurrentPiece();
    this.currentPiece.spin(this.board);
    this.addTetromino();
    this.setNewPositionDown();
  }

  public end() {
    this.lose = true;
    this.start = false;
  }

  private checksRows() {
    this.currentPiece.getShape.shape.forEach((row, rowIndex) => {
      const currentRow = this.currentPiece.getCurrentRow + rowIndex;
      for (const col of row) {
        if (!col) continue;
        const rowComplete = this.board[currentRow].every((e) => e);
        if (!rowComplete) break;
        this.clearRow(currentRow);
        this.updateInformation();
      }
    });
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

  private haveCollision() {
    this.addTetromino();
    this.checksRows();
    const piece = this.nextPiece;
    if (!this.canAddPiece(piece)) {
      this.lose = true;
      this.start = false;
      return;
    }
    this.currentPiece = piece;
    this.nextPiece = this.nextPieces.shift()!;
    this.nextPieces.push(this.factory.randomPiece());
    this.addTetromino();
    this.setNewPositionDown();
    return;
  }

  public moveDown(): boolean {
    if (!this.start || this.lose) return false;
    this.removeCurrentPiece();
    if (this.canMoveDown() === 1) {
      this.haveCollision();
      return false;
    }
    this.currentPiece.setCurrentRow = 1;
    this.addTetromino();
    return true;
  }

  public put() {
    while (this.moveDown()) {}
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

  public moveLeft(): boolean {
    if (!this.start || this.lose) return false;
    if (this.canMoveLeft() === 1) return false;
    const fistColumnIndex = this.currentPiece.getShape.columnFirstIndex;
    if (this.currentPiece.getCurrentColumn - 1 + fistColumnIndex < 0)
      return false;
    this.removeCurrentPiece();
    this.currentPiece.setCurrentColumn = -1;
    this.addTetromino();
    this.setNewPositionDown();
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

  public moveRight() {
    if (!this.start || this.lose) return false;
    if (this.canMoveRight() === 1) return false;
    this.removeCurrentPiece();
    this.currentPiece.setCurrentColumn = 1;
    this.addTetromino();
    this.setNewPositionDown();
    return true;
  }

  private addTetromino() {
    let rowIndex = this.currentPiece.getCurrentRow;
    let colIndex = this.currentPiece.getCurrentColumn;
    const shape = this.currentPiece.getShape;
    this.currentPiece.removeCells();
    this.currentPiece.getShape.shape.forEach((row, ri) => {
      row.forEach((_col, ci) => {
        if (shape.shape[ri][ci] && !this.board[rowIndex][colIndex]) {
          this.board[rowIndex][colIndex] = this.currentPiece.getColor;
          this.currentPiece.addCell(rowIndex, colIndex);
        }
        colIndex += 1;
      });
      rowIndex += 1;
      colIndex = this.currentPiece.getCurrentColumn;
    });
  }

  private spawnTetromino() {
    this.currentPiece = this.factory.randomPiece();
    this.addTetromino();
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
