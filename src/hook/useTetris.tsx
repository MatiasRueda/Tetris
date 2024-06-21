import { useEffect, useState } from "react";
import Tetris from "../gameLogic/tetris";

const tetris = new Tetris();

export function useTetris() {
  const [board, setBoard] = useState(tetris.getBoard);

  const detectKeyDown = (e: KeyboardEvent) => {
    if (e.key === "s") {
      tetris.moveTetrominoDown();
      setBoard([...tetris.getBoard]);
    } else if (e.key === "w") {
      tetris.rotate();
      setBoard([...tetris.getBoard]);
    } else if (e.key === "a") {
      tetris.moveTetrominoLeft();
      setBoard([...tetris.getBoard]);
    } else if (e.key === "d") {
      tetris.moveTetrominoRight();
      setBoard([...tetris.getBoard]);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  return { board };
}
