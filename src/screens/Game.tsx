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

  const renderUserInfo = () => {
    return user.info ? (
      <div className="cont-user-name-score">
        <p>Username: {user.info.username}</p>
        <p>Max Score: {user.info.score}</p>
      </div>
    ) : (
      <div className="cont-user-name-score-base"></div>
    );
  };

  const renderGameControls = () => {
    if (tetris.info.start || tetris.info.lose) {
      return tetris.pause ? <Pause key="pause" resume={tetris.resume} /> : null;
    }
    return <Controllers key="controllers" startGame={tetris.startGame} />;
  };

  const renderLoseScreen = () => {
    if (tetris.info.lose) {
      return (
        <Lose
          key="lose"
          resetGame={tetris.resetGame}
          difficulty={config.difficulty}
          {...tetris.info}
        />
      );
    }
    return null;
  };

  return (
    <section className="game">
      <AnimatePresence>
        <Information key="info" {...tetris.info} />
        <div className="cont-game-user">
          {renderUserInfo()}
          <Board
            key="board"
            last={tetris.info.positionDown}
            board={tetris.info.board}
          />
        </div>
        <NextPieces
          key="nextPieces"
          piece={tetris.info.nextPiece}
          pieces={tetris.info.nextPieces}
        />
        {renderGameControls()}
        {renderLoseScreen()}
      </AnimatePresence>
    </section>
  );
}
