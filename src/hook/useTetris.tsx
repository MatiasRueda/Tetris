import { useEffect, useState } from "react";
import Tetris from "../gameLogic/tetris";
import { TetrisInfo } from "../gameLogic/utils/type/type";
import { Difficulty } from "../context/ConfigContext";
import usePause from "./usePause";

const tetris = new Tetris();

function useTetris(difficulty: Difficulty) {
  const [info, setInfo] = useState<TetrisInfo>(tetris.getInformation);
  const [stop, setStop] = useState<NodeJS.Timeout>();
  const pause = usePause(info.start);
  const keys = ["s", "w", "a", "d"];

  const startGame = () => {
    tetris.startGame();
    setInfo(tetris.getInformation);
  };

  const resetGame = () => {
    tetris.resetGame();
    setInfo(tetris.getInformation);
  };

  const detectKeyDown = (e: KeyboardEvent) => {
    const currentKey = e.key.toLowerCase();
    if (!keys.some((k) => k === currentKey)) {
      return;
    } else if (currentKey === "s") {
      tetris.movePieceToFloor();
    } else if (currentKey === "w") {
      tetris.rotate();
    } else if (currentKey === "a") {
      tetris.moveLeft();
    } else if (currentKey === "d") {
      tetris.moveRight();
    }
    setInfo(tetris.getInformation);
  };

  const configInterval = () => {
    return setInterval(() => {
      tetris.moveDown();
      setInfo(tetris.getInformation);
    }, difficulty);
  };

  useEffect(() => {
    if (!tetris.getInformation.start || pause.value) return;
    document.addEventListener("keydown", detectKeyDown, true);
    return () => {
      document.removeEventListener("keydown", detectKeyDown, true);
    };
  }, [tetris.getInformation.start, pause.value]);

  useEffect(() => {
    if (!tetris.getInformation.start || tetris.getInformation.lose) {
      if (stop) clearInterval(stop);
      return;
    }
    if (pause.value && stop) {
      clearInterval(stop);
      return;
    }
    setStop(configInterval());
  }, [tetris.getInformation.start, tetris.getInformation.lose, pause.value]);

  return {
    info,
    startGame,
    pause: pause.value,
    resume: pause.resume,
    resetGame,
  };
}

export default useTetris;
