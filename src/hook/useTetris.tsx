import { useEffect, useRef, useState } from "react";
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

  const configInterval = () => {
    return setInterval(() => {
      tetris.moveDown();
      setInfo(tetris.getInformation);
    }, difficulty);
  };

  useEffect(() => {
    if (!tetris.getInformation.start || pause.value) return;
    console.log("Holaa");
    document.addEventListener("keydown", detectKeyDown, true);
    return () => {
      document.removeEventListener("keydown", detectKeyDown, true);
      console.log("sali");
    };
  }, [tetris.getInformation.start, pause.value]);

  useEffect(() => {
    if (!tetris.getInformation.start) return;
    if (pause.value && stop) {
      clearInterval(stop);
      return;
    }
    setStop(configInterval());
  }, [tetris.getInformation.start, pause.value]);

  return { info, startGame, pause: pause.value, resume: pause.resume };
}

export default useTetris;
