import { AnimatePresence } from "framer-motion";
import Home from "../screens/Home";
import Game from "../screens/Game";
import { useScreenContext } from "../context/ScreenContext";
import TransitionWrapper from "./TransitionWrapper";

export default function Screen() {
  const screen = useScreenContext();

  return (
    <AnimatePresence mode="wait">
      <TransitionWrapper key={screen.current}>
        {screen.current === screen.screens.Home && <Home />}
        {screen.current === screen.screens.Game && <Game />}
      </TransitionWrapper>
    </AnimatePresence>
  );
}
