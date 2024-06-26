export type Tetromino = {
  typeRotation: Shape;
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

export type Shape = {
  shape: number[][];
  width: number;
  rowFirstIndex: number;
  rowLastIndex: number;
  columnFirstIndex: number;
  columnLastIndex: number;
};
