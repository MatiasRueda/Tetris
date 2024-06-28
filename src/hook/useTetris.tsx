import { useEffect, useState } from "react";
import Tetris from "../gameLogic/tetris";

const tetris = new Tetris();

export function useTetris() {
  const [board, setBoard] = useState(tetris.getBoard);
  const [nextPiece, setNextPiece] = useState(tetris.getNextPiece);
  const [nextPieces, setNextPieces] = useState(tetris.getNextPieces);
  const [level, setLevel] = useState(tetris.getLevel);
  const [lines, setLines] = useState(tetris.getLines);
  const [score, setScore] = useState(tetris.getScore);
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
    setBoard([...tetris.getBoard]);
    setNextPiece(tetris.getNextPiece);
    setLevel(tetris.getLevel);
    setScore(tetris.getScore);
    setLines(tetris.getLines);
    setNextPieces(tetris.getNextPieces);
  };

  useEffect(() => {
    tetris.startGame();
    document.addEventListener("keydown", detectKeyDown, true);
  }, []);

  return { board, nextPiece, nextPieces, level, score, lines };
}
