import { createContext, ReactNode, useContext, useState } from "react";

enum Screen {
  Home,
  Game,
}

type ScreenCtrl = {
  current: Screen;
  changeToGame: () => void;
  changeToHome: () => void;
  screens: typeof Screen;
};

const screen = createContext<ScreenCtrl | undefined>(undefined);

export function useScreenContext() {
  return useContext(screen)!;
}

export default function ScreenContext(props: { children: ReactNode }) {
  const [current, setCurrent] = useState(Screen.Home);
  const changeToGame = () => {
    setCurrent(Screen.Game);
  };

  const changeToHome = () => {
    setCurrent(Screen.Home);
  };
  return (
    <screen.Provider
      value={{ current, changeToGame, changeToHome, screens: Screen }}
    >
      {props.children}
    </screen.Provider>
  );
}
