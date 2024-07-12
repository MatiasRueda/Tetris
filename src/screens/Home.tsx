import { motion } from "framer-motion";
import { useScreenContext } from "../context/ScreenContext";
import "../assets/style/home.css";

export default function Home() {
  const screen = useScreenContext();

  return (
    <section className="home">
      <h1>Tetris</h1>
      <motion.button
        className="start-btn"
        onClick={screen.changeToGame}
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        Start Game
      </motion.button>
    </section>
  );
}
