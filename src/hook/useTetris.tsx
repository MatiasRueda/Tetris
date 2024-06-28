import { useEffect, useState } from "react";
import Tetris from "../gameLogic/tetris";

const tetris = new Tetris();

export function useTetris() {
  const [board, setBoard] = useState(tetris.getBoard);
  const [nextPiece, setNextPiece] = useState(tetris.getNextPiece);
  const keys = ["s", "w", "a", "d"];

  const detectKeyDown = (e: KeyboardEvent) => {
    if (!keys.some((k) => k === e.key)) {
      return;
    } else if (e.key === "s") {
      tetris.moveDown();
    } else if (e.key === "w") {
      tetris.rotate();
    } else if (e.key === "a") {
      tetris.moveLeft();
    } else if (e.key === "d") {
      tetris.moveRight();
    }
    setBoard([...tetris.getBoard]);
    setNextPiece(tetris.getNextPiece);
  };

  useEffect(() => {
    tetris.startGame();
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  return { board, nextPiece };
}
