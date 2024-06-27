import { Shape } from "../../type";

export const L: Shape[] = [
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    rowFirstIndex: 0,
    rowLastIndex: 1,
    columnFirstIndex: 0,
    columnLastIndex: 2,
  },
  {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    rowFirstIndex: 0,
    rowLastIndex: 2,
    columnFirstIndex: 1,
    columnLastIndex: 2,
  },
  {
    shape: [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    rowFirstIndex: 1,
    rowLastIndex: 2,
    columnFirstIndex: 0,
    columnLastIndex: 2,
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    rowFirstIndex: 0,
    rowLastIndex: 2,
    columnFirstIndex: 0,
    columnLastIndex: 1,
  },
];
