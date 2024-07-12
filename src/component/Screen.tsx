import { AnimatePresence } from "framer-motion";
import Home from "../screens/Home";
import Game from "../screens/Game";
import { useScreenContext } from "../context/ScreenContext";
import Transition from "./Transition";

export default function Screen() {
  const screen = useScreenContext();

  return (
    <AnimatePresence>
      {screen.current === screen.screens.Home && <Home key={screen.current} />}
      {screen.current === screen.screens.Game && <Game key={screen.current} />}
      <Transition show={screen.show} exit={screen.transition} />
    </AnimatePresence>
  );
}
