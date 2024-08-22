import { createContext, ReactNode, useContext, useState } from "react";
import { delay } from "../utils/delay";

enum Screen {
  Home,
  Game,
  Login,
  Register,
  Config,
  Table,
  CreditsAndTechnologies,
  Loading,
}

type ScreenCtrl = {
  show: boolean;
  transition: boolean;
  current: Screen;
  changeToGame: () => Promise<void>;
  changeToHome: () => Promise<void>;
  changeToCreditsAndTechnologies: () => Promise<void>;
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
    await new Promise((resolve) => setTimeout(resolve, delay));
    setCurrent(screen);
    setTransition(false);
    await new Promise((resolve) => setTimeout(resolve, delay));
    setShow(false);
  };

  const changeToGame = async () => {
    waitTransition(Screen.Game);
  };

  const changeToHome = async () => {
    waitTransition(Screen.Home);
  };

  const changeToCreditsAndTechnologies = async () => {
    waitTransition(Screen.CreditsAndTechnologies);
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
        changeToCreditsAndTechnologies,
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
