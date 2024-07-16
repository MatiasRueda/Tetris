import { useEffect, useState } from "react";
import Tetris from "../gameLogic/tetris";
import { TetrisInfo } from "../gameLogic/utils/type/type";
import { Difficulty } from "../context/ConfigContext";
import usePause from "./usePause";

const tetris = new Tetris();

function useTetris(difficulty: Difficulty) {
  const [info, setInfo] = useState<TetrisInfo>(tetris.getInformation);
  const [_stop, setStop] = useState<NodeJS.Timeout>();
  const pause = usePause(info.start);
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
    if (pause.value) {
      document.removeEventListener("keydown", detectKeyDown);
      return;
    }
    if (!tetris.getInformation.start) return;
    document.addEventListener("keydown", detectKeyDown, true);
  }, [tetris.getInformation.start, pause.value]);

  useEffect(() => {
    if (pause.value) {
      setStop((v) => {
        if (!v) return undefined;
        clearInterval(v);
      });
      return;
    }
    if (!tetris.getInformation.start) return;
    const interval = setInterval(() => {
      tetris.moveDown();
      setInfo(tetris.getInformation);
    }, difficulty);
    setStop(interval);
  }, [tetris.getInformation.start, pause.value]);

  return { info, startGame, pause: pause.value, resume: pause.resume };
}

export default useTetris;
