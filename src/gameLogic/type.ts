export type Tetromino = {
  typeRotation: TetrominoRotateInfo;
  rows: number;
  columns: number;
  type: string;
  rotateIndex: number;
  rotate: (
    maxRow: number,
    row: number,
    maxCol: number,
    col: number,
    board: number[][],
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
