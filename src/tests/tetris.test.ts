import Tetris from "../gameLogic/tetris";

describe("Tetris Class create correctly", () => {
  test("Board is empty", () => {
    const tetris = new Tetris();
    const result = tetris.getInformation.board.every((row) => {
      return row.every((element) => !element);
    });
    expect(result).toBeTruthy();
  });

  test("Lose is false", () => {
    const tetris = new Tetris();
    expect(tetris.getInformation.lose).toBeFalsy();
  });
});

describe("Move down", () => {
  let tetris: Tetris;
  beforeEach(() => {
    tetris = new Tetris();
  });

  describe("The game not start", () => {
    let tetris = new Tetris();
    test("One move down is false", () => {
      expect(tetris.moveDown()).toBeFalsy();
    });

    test("Two moves down is false", () => {
      tetris.moveDown();
      expect(tetris.moveDown()).toBeFalsy();
    });

    test("Three moves down is false", () => {
      tetris.moveDown();
      tetris.moveDown();
      expect(tetris.moveDown()).toBeFalsy();
    });
  });

  describe("The game start", () => {
    beforeEach(() => {
      tetris = new Tetris();
      tetris.startGame();
    });

    test("One move down is true", () => {
      expect(tetris.moveDown()).toBeTruthy();
    });

    test("Two moves down is true", () => {
      tetris.moveDown();
      expect(tetris.moveDown()).toBeTruthy();
    });

    test("Three moves down is true", () => {
      tetris.moveDown();
      tetris.moveDown();
      expect(tetris.moveDown()).toBeTruthy();
    });

    test("The board not same, after move", () => {
      const boardBeforeMove = tetris.getInformation.board.toString();
      tetris.moveDown();
      const boardAfterMove = tetris.getInformation.board.toString();
      expect(boardBeforeMove.toString()).not.toEqual(boardAfterMove.toString());
    });

    test("The board not same, after two moves", () => {
      const board = tetris.getInformation.board.toString();
      tetris.moveDown();
      const boardDown = tetris.getInformation.board.toString();
      tetris.moveDown();
      const boardDownTwo = tetris.getInformation.board.toString();
      const result = board !== boardDown && board !== boardDownTwo;
      expect(result).toBeTruthy();
    });
  });
});

describe("Move Left", () => {
  let tetris: Tetris;
  beforeEach(() => {
    tetris = new Tetris();
  });

  describe("The game not start", () => {
    test("One move left is false", () => {
      expect(tetris.moveLeft()).toBeFalsy();
    });

    test("Two moves left is false", () => {
      tetris.moveLeft();
      expect(tetris.moveLeft()).toBeFalsy();
    });

    test("Three moves left is false", () => {
      tetris.moveLeft();
      tetris.moveLeft();
      expect(tetris.moveLeft()).toBeFalsy();
    });
  });

  describe("The game start", () => {
    beforeEach(() => {
      tetris = new Tetris();
      tetris.startGame();
    });

    test("One move left is true", () => {
      expect(tetris.moveLeft()).toBeTruthy();
    });

    test("Two moves left is true", () => {
      tetris.moveLeft();
      expect(tetris.moveLeft()).toBeTruthy();
    });

    test("Three moves left is true", () => {
      tetris.moveLeft();
      tetris.moveLeft();
      expect(tetris.moveLeft()).toBeTruthy();
    });

    test("The board not same, after move", () => {
      const boardBeforeMove = tetris.getInformation.board.toString();
      tetris.moveLeft();
      const boardAfterMove = tetris.getInformation.board.toString();
      expect(boardBeforeMove.toString()).not.toEqual(boardAfterMove.toString());
    });

    test("The board not same, after two moves", () => {
      const board = tetris.getInformation.board.toString();
      tetris.moveLeft();
      const boardLeft = tetris.getInformation.board.toString();
      tetris.moveLeft();
      const boardLeftTwo = tetris.getInformation.board.toString();
      const result = board !== boardLeft && board !== boardLeftTwo;
      expect(result).toBeTruthy();
    });
  });
});

describe("Move Right", () => {
  let tetris: Tetris;

  beforeEach(() => {
    tetris = new Tetris();
  });

  describe("The game not start", () => {
    test("One move right is false", () => {
      expect(tetris.moveRight()).toBeFalsy();
    });

    test("Two moves right is false", () => {
      tetris.moveRight();
      expect(tetris.moveRight()).toBeFalsy();
    });

    test("Three moves right is false", () => {
      tetris.moveRight();
      tetris.moveRight();
      expect(tetris.moveRight()).toBeFalsy();
    });
  });

  describe("The game start", () => {
    beforeEach(() => {
      tetris = new Tetris();
      tetris.startGame();
    });

    test("One move right is true", () => {
      expect(tetris.moveRight()).toBeTruthy();
    });

    test("Two moves right is true", () => {
      tetris.moveRight();
      expect(tetris.moveRight()).toBeTruthy();
    });

    test("Three moves right is true", () => {
      tetris.moveRight();
      tetris.moveRight();
      expect(tetris.moveRight()).toBeTruthy();
    });

    test("The board not same, after move", () => {
      const boardBeforeMove = tetris.getInformation.board.toString();
      tetris.moveRight();
      const boardAfterMove = tetris.getInformation.board.toString();
      expect(boardBeforeMove.toString()).not.toEqual(boardAfterMove.toString());
    });

    test("The board not same, after two moves", () => {
      const board = tetris.getInformation.board.toString();
      tetris.moveRight();
      const boardRight = tetris.getInformation.board.toString();
      tetris.moveRight();
      const boardRightTwo = tetris.getInformation.board.toString();
      const result = board !== boardRight && board !== boardRightTwo;
      expect(result).toBeTruthy();
    });
  });
});

describe("More moves", () => {
  let tetris: Tetris;

  beforeEach(() => {
    tetris = new Tetris();
    tetris.startGame();
  });

  test("Down and Left moves is true", () => {
    const result = tetris.moveDown();
    const result2 = tetris.moveLeft();
    expect(result && result2).toBeTruthy();
  });

  test("The board changes after Down and Left moves", () => {
    const board = tetris.getInformation.board.toString();
    tetris.moveDown();
    const boardDown = tetris.getInformation.board.toString();
    tetris.moveLeft();
    const boardLeft = tetris.getInformation.board.toString();
    const result = board !== boardDown && boardDown !== boardLeft;
    expect(result).toBeTruthy();
  });

  test("Down and right moves is true", () => {
    const result = tetris.moveDown();
    const result2 = tetris.moveRight();
    expect(result && result2).toBeTruthy();
  });

  test("The board changes after Down and Right moves", () => {
    const board = tetris.getInformation.board.toString();
    tetris.moveDown();
    const boardDown = tetris.getInformation.board.toString();
    tetris.moveRight();
    const boardRight = tetris.getInformation.board.toString();
    const result = board !== boardDown && boardDown !== boardRight;
    expect(result).toBeTruthy();
  });
});
