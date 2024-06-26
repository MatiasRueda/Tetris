import { PieceInfo } from "../type";

export const Z: PieceInfo[] = [
  {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    width: 4,
    rowFirstIndex: 1,
    rowLastIndex: 1,
    columnFirstIndex: 0,
    columnLastIndex: 3,
  },
  {
    shape: [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    width: 1,
    rowFirstIndex: 0,
    rowLastIndex: 3,
    columnFirstIndex: 2,
    columnLastIndex: 2,
  },
  {
    shape: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    width: 4,
    rowFirstIndex: 2,
    rowLastIndex: 2,
    columnFirstIndex: 0,
    columnLastIndex: 3,
  },
  {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    width: 1,
    rowFirstIndex: 0,
    rowLastIndex: 3,
    columnFirstIndex: 1,
    columnLastIndex: 1,
  },
];
