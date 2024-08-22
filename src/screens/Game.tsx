import "../assets/style/game.css";
import Board from "../component/Board";
import useTetris from "../hook/useTetris";
import Information from "../component/Information";
import NextPieces from "../component/NextPieces";
import Controllers from "../component/Controllers";
import Lose from "../component/Lose";
import { useConfigContext } from "../context/ConfigContext";
import Pause from "../component/Pause";
import { AnimatePresence } from "framer-motion";
import { useUserContext } from "../context/UserContext";

export default function Game() {
  const config = useConfigContext();
  const user = useUserContext();
  const tetris = useTetris(config.difficulty);

  return (
    <section className="game">
      <AnimatePresence>
        <Information key={0} {...tetris.info} />
        <div className="cont-game-user">
          {user.info ? (
            <div className="cont-user-name-score">
              <p>Username: {user.info.username}</p>
              <p>Max Score: {user.info.score}</p>
            </div>
          ) : (
            <div className="cont-user-name-score-base"></div>
          )}
          <Board
            key={1}
            last={tetris.info.positionDown}
            board={tetris.info.board}
          />
        </div>
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
