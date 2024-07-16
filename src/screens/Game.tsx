import Board from "../component/Board";
import useTetris from "../hook/useTetris";
import Information from "../component/Information";
import NextPieces from "../component/NextPieces";
import Controllers from "../component/Controllers";
import Lose from "../component/Lose";
import { useConfigContext } from "../context/ConfigContext";
import Pause from "../component/Pause";
import "../assets/style/game.css";
import { AnimatePresence } from "framer-motion";

export default function Game() {
  const config = useConfigContext();
  const tetris = useTetris(config.difficulty);

  return (
    <section className="game">
      <AnimatePresence>
        <Information key={0} {...tetris.info} />
        <Board key={1} board={tetris.info.board} />
        <NextPieces
          key={2}
          piece={tetris.info.nextPiece}
          pieces={tetris.info.nextPieces}
        />

        {!(!tetris.info.start && !tetris.info.lose) && tetris.pause && (
          <Pause key={3} resume={tetris.resume} />
        )}
        {!tetris.info.start && !tetris.info.lose && (
          <Controllers key={4} startGame={tetris.startGame} />
        )}
        {tetris.info.lose && (
          <Lose key={5} difficulty={config.difficulty} {...tetris.info} />
        )}
      </AnimatePresence>
    </section>
  );
}
