export type Tetromino = {
  typeRotation: TetrominoRotateInfo;
  rows: number;
  color: string;
  columns: number;
  type: string;
  rotateIndex: number;
  rotate: (
    maxRow: number,
    row: number,
    maxCol: number,
    col: number,
    board: (Tetromino | number)[][],
    old: Tetromino
  ) => void;
};

export type TetrominoRotateInfo = {
  shape: number[][];
  width: number;
  rowFirstIndex: number;
  rowLastIndex: number;
  columnFirstIndex: number;
  columnLastIndex: number;
};
