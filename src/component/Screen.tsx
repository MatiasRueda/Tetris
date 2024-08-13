import { AnimatePresence } from "framer-motion";
import Home from "../screens/Home";
import Game from "../screens/Game";
import { useScreenContext } from "../context/ScreenContext";
import Transition from "./Transition";
import Config from "../screens/Config";
import Credits from "../screens/Credits";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Loading from "../screens/Loading";

export default function Screen() {
  const screen = useScreenContext();

  return (
    <AnimatePresence>
      {screen.current === screen.screens.Home && <Home key={screen.current} />}
      {screen.current === screen.screens.Game && <Game key={screen.current} />}
      {screen.current === screen.screens.Loading && (
        <Loading key={screen.current} />
      )}
      {screen.current === screen.screens.Login && (
        <Login key={screen.current} />
      )}
      {screen.current === screen.screens.Register && (
        <Register key={screen.current} />
      )}
      {screen.current === screen.screens.Config && (
        <Config key={screen.current} />
      )}
      {screen.current === screen.screens.Credits && (
        <Credits key={screen.current} />
      )}
      <Transition show={screen.show} exit={screen.transition} />
    </AnimatePresence>
  );
}
