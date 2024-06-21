export type Tetromino = {
  typeRotation: TetrominoRotateInfo;
  rows: number;
  columns: number;
  type: string;
  rotateIndex: number;
  rotate: () => void;
};

export type TetrominoRotateInfo = {
  shape: number[][];
  width: number;
  rowLastIndex: number;
};
