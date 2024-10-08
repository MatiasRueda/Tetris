import { AnimatePresence } from "framer-motion";
import "../assets/style/home.css";
import HomeBtns from "../component/HomeBtns";
import User from "../component/User";
import { useUserContext } from "../context/UserContext";
import Fade from "../component/Fade";

export default function Home() {
  const user = useUserContext();
  return (
    <section className="home">
      <AnimatePresence>
        <Fade style={{ flexDirection: "row" }}>
          <div className="cont-null"></div>
          <div className="cont-main">
            <h1>Tetris</h1>
            <HomeBtns />
          </div>
          <div className="cont-user">
            {user.info && (
              <User username={user.info.username} score={user.info.score} />
            )}
          </div>
        </Fade>
      </AnimatePresence>
    </section>
  );
}
