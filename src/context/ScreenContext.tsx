import { createContext, ReactNode, useContext, useState } from "react";

enum Screen {
  Home,
  Game,
  Login,
  Register,
  Config,
  Table,
  Credits,
  Loading,
}

type ScreenCtrl = {
  show: boolean;
  transition: boolean;
  current: Screen;
  changeToGame: () => Promise<void>;
  changeToHome: () => Promise<void>;
  changeToCredits: () => Promise<void>;
  changeToConfig: () => Promise<void>;
  changeToLogin: () => Promise<void>;
  changeToRegister: () => Promise<void>;
  changeToTable: () => Promise<void>;
  changeToLoading: () => Promise<void>;
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
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setCurrent(screen);
    setTransition(false);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setShow(false);
  };

  const changeToGame = async () => {
    waitTransition(Screen.Game);
  };

  const changeToHome = async () => {
    waitTransition(Screen.Home);
  };

  const changeToCredits = async () => {
    waitTransition(Screen.Credits);
  };

  const changeToConfig = async () => {
    waitTransition(Screen.Config);
  };

  const changeToLogin = async () => {
    waitTransition(Screen.Login);
  };
  const changeToRegister = async () => {
    waitTransition(Screen.Register);
  };

  const changeToTable = async () => {
    waitTransition(Screen.Table);
  };

  const changeToLoading = async () => {
    setCurrent(Screen.Loading);
  };

  return (
    <screen.Provider
      value={{
        show,
        transition,
        current,
        changeToGame,
        changeToHome,
        changeToConfig,
        changeToCredits,
        changeToLogin,
        changeToRegister,
        changeToTable,
        changeToLoading,
        screens: Screen,
      }}
    >
      {props.children}
    </screen.Provider>
  );
}
