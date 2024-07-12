import { useEffect, useState } from "react";
import Tetris from "../gameLogic/tetris";
import { TetrisInfo } from "../gameLogic/utils/type/type";

const tetris = new Tetris();

export function useTetris() {
  const [info, setInfo] = useState<TetrisInfo>(tetris.getInformation);
  const keys = ["s", "w", "a", "d"];

  const detectKeyDown = (e: KeyboardEvent) => {
    if (!keys.some((k) => k === e.key)) {
      return;
    } else if (e.key === "s") {
      tetris.put();
    } else if (e.key === "w") {
      tetris.rotate();
    } else if (e.key === "a") {
      tetris.moveLeft();
    } else if (e.key === "d") {
      tetris.moveRight();
    }
    setInfo(tetris.getInformation);
  };

  useEffect(() => {
    tetris.startGame();
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  useEffect(() => {
    setInterval(() => {
      tetris.moveDown();
      setInfo(tetris.getInformation);
    }, 1000);
  }, []);

  return { info };
}
