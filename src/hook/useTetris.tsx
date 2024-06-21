import { useEffect, useState } from "react";
import Tetris from "../gameLogic/tetris";

export function useTetris() {
  const tetris = new Tetris();
  const [board, setBoard] = useState(tetris.getBoard);

  const detectKeyDown = (e: KeyboardEvent) => {
    if (e.key === "s") {
      tetris.moveTetrominoDown();
      setBoard(tetris.getBoard);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  return { board };
}
