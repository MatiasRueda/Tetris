import { createContext, ReactNode, useContext, useState } from "react";

enum Screen {
  Home,
  Game,
}

type ScreenCtrl = {
  transition: boolean;
  current: Screen;
  changeToGame: () => Promise<void>;
  changeToHome: () => Promise<void>;
  screens: typeof Screen;
};

const screen = createContext<ScreenCtrl | undefined>(undefined);

export function useScreenContext() {
  return useContext(screen)!;
}

export default function ScreenContext(props: { children: ReactNode }) {
  const [transition, setTransition] = useState(false);
  const [current, setCurrent] = useState(Screen.Home);

  const changeToGame = async () => {
    setTransition(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setCurrent(Screen.Game);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setTransition(false);
  };

  const changeToHome = async () => {
    setTransition(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setCurrent(Screen.Home);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setTransition(false);
  };
  return (
    <screen.Provider
      value={{
        transition,
        current,
        changeToGame,
        changeToHome,
        screens: Screen,
      }}
    >
      {props.children}
    </screen.Provider>
  );
}
