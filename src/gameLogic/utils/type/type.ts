import Piece from "../../piece";

export type Shape = {
  shape: number[][];
  rowFirstIndex: number;
  rowLastIndex: number;
  columnFirstIndex: number;
  columnLastIndex: number;
};

export type TetrisInfo = {
  board: (string | undefined)[][];
  nextPieces: Piece[];
  nextPiece: Piece;
  level: number;
  lines: number;
  score: number;
  start: boolean;
  lose: boolean;
  positionDown: [number, number][];
};
