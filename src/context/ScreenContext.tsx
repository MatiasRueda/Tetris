import { createContext, ReactNode, useContext, useState } from "react";

enum Screen {
  Home,
  Game,
}

type ScreenCtrl = {
  show: boolean;
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
  const [show, setShow] = useState(false);
  const [transition, setTransition] = useState(false);
  const [current, setCurrent] = useState(Screen.Home);

  const waitTransition = async (screen: Screen) => {
    setShow(true);
    setTransition(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCurrent(screen);
    setTransition(false);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setShow(false);
  };

  const changeToGame = async () => {
    waitTransition(Screen.Game);
  };

  const changeToHome = async () => {
    waitTransition(Screen.Home);
  };
  return (
    <screen.Provider
      value={{
        show,
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
