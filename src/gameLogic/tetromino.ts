import { Tetromino, TetrominoRotateInfo } from "./type";

const TetrominoesRotation: Record<string, TetrominoRotateInfo[]> = {
  I: [
    {
      shape: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      width: 4,
      rowLastIndex: 1,
    },
    {
      shape: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
      width: 1,
      rowLastIndex: 3,
    },
    {
      shape: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      width: 4,
      rowLastIndex: 2,
    },
    {
      shape: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      width: 1,
      rowLastIndex: 3,
    },
  ],

  J: [
    {
      shape: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      width: 3,
      rowLastIndex: 1,
    },
    {
      shape: [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      width: 2,
      rowLastIndex: 2,
    },
    {
      shape: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      width: 3,
      rowLastIndex: 2,
    },
    {
      shape: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      width: 2,
      rowLastIndex: 2,
    },
  ],

  L: [
    {
      shape: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      width: 3,
      rowLastIndex: 1,
    },
    {
      shape: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      width: 2,
      rowLastIndex: 2,
    },
    {
      shape: [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      width: 3,
      rowLastIndex: 2,
    },
    {
      shape: [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      width: 2,
      rowLastIndex: 2,
    },
  ],
  O: [
    {
      shape: [
        [1, 1],
        [1, 1],
      ],
      width: 2,
      rowLastIndex: 1,
    },
    {
      shape: [
        [1, 1],
        [1, 1],
      ],
      width: 2,
      rowLastIndex: 1,
    },
    {
      shape: [
        [1, 1],
        [1, 1],
      ],
      width: 2,
      rowLastIndex: 1,
    },
    {
      shape: [
        [1, 1],
        [1, 1],
      ],
      width: 2,
      rowLastIndex: 1,
    },
  ],
  S: [
    {
      shape: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      width: 3,
      rowLastIndex: 1,
    },
    {
      shape: [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
      width: 2,
      rowLastIndex: 2,
    },
    {
      shape: [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      width: 3,
      rowLastIndex: 2,
    },
    {
      shape: [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      width: 2,
      rowLastIndex: 2,
    },
  ],
  T: [
    {
      shape: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      width: 3,
      rowLastIndex: 1,
    },
    {
      shape: [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      width: 2,
      rowLastIndex: 2,
    },
    {
      shape: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      width: 3,
      rowLastIndex: 2,
    },
    {
      shape: [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      width: 2,
      rowLastIndex: 2,
    },
  ],
  Z: [
    {
      shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      width: 3,
      rowLastIndex: 1,
    },
    {
      shape: [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
      width: 2,
      rowLastIndex: 2,
    },
    {
      shape: [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      width: 3,
      rowLastIndex: 2,
    },
    {
      shape: [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      width: 2,
      rowLastIndex: 2,
    },
  ],
};

function nextIndex(currentIndex: number, maxIndex: number): number {
  return currentIndex + 1 >= maxIndex ? 0 : currentIndex + 1;
}

function rotate(this: Tetromino) {
  this.rotateIndex = nextIndex(this.rotateIndex, 4);
  this.typeRotation = TetrominoesRotation[this.type][this.rotateIndex];
}

export const Tetrominos: Record<string, Tetromino> = {
  I: {
    rows: 4,
    columns: 4,
    type: "I",
    rotateIndex: 0,
    typeRotation: TetrominoesRotation.I[0],
    rotate: rotate,
  },
  J: {
    rows: 3,
    columns: 3,
    type: "J",
    rotateIndex: 0,
    typeRotation: TetrominoesRotation.J[0],
    rotate: rotate,
  },
  L: {
    rows: 3,
    columns: 3,
    type: "L",
    rotateIndex: 0,
    typeRotation: TetrominoesRotation.L[0],
    rotate: rotate,
  },

  O: {
    rows: 2,
    columns: 2,
    type: "O",
    rotateIndex: 0,
    typeRotation: TetrominoesRotation.O[0],
    rotate: rotate,
  },
  S: {
    rows: 3,
    columns: 3,
    type: "S",
    rotateIndex: 0,
    typeRotation: TetrominoesRotation.S[0],
    rotate: rotate,
  },

  T: {
    rows: 3,
    columns: 3,
    type: "T",
    rotateIndex: 0,
    typeRotation: TetrominoesRotation.T[0],
    rotate: rotate,
  },
  Z: {
    rows: 3,
    columns: 3,
    type: "Z",
    rotateIndex: 0,
    typeRotation: TetrominoesRotation.Z[0],
    rotate: rotate,
  },
};
