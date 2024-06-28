import { useEffect, useState } from "react";
import Tetris from "../gameLogic/tetris";

const tetris = new Tetris();

export function useTetris() {
  const [board, setBoard] = useState(tetris.getBoard);

  const detectKeyDown = (e: KeyboardEvent) => {
    if (e.key === "s") {
      tetris.moveDown();
    } else if (e.key === "w") {
      tetris.rotate();
    } else if (e.key === "a") {
      tetris.moveLeft();
    } else if (e.key === "d") {
      tetris.moveRight();
    }
    setBoard([...tetris.getBoard]);
  };

  useEffect(() => {
    tetris.startGame();
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  return { board };
}
