import { useEffect, useState } from "react";
import Tetris from "../gameLogic/tetris";
import { TetrisInfo } from "../gameLogic/utils/type/type";

const tetris = new Tetris();

export function useTetris() {
  const [info, setInfo] = useState<TetrisInfo>(tetris.getInformation);
  const keys = ["s", "w", "a", "d"];

  const startGame = () => {
    tetris.startGame();
    setInfo(tetris.getInformation);
  };

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
    if (!tetris.getInformation.start) return;
    document.addEventListener("keydown", detectKeyDown, true);
  }, [tetris.getInformation.start]);

  useEffect(() => {
    if (!tetris.getInformation.start) return;
    setInterval(() => {
      tetris.moveDown();
      setInfo(tetris.getInformation);
    }, 1000);
  }, [tetris.getInformation.start]);

  return { info, startGame };
}
