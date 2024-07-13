import { createContext, ReactNode, useContext, useState } from "react";

enum Dificult {
  Easy = 1500,
  Medium = 1000,
  Hard = 500,
}

type Config = {
  dificult: Dificult;
  changeDificult: (dificult: Dificult) => void;
  dificults: typeof Dificult;
};

const config = createContext<Config | undefined>(undefined);

export function useConfigContext() {
  return useContext(config)!;
}

export default function ConfigContext(props: { children: ReactNode }) {
  const [dificult, setDificult] = useState(Dificult.Medium);

  const changeDificult = (dificult: Dificult) => {
    setDificult(dificult);
  };

  return (
    <config.Provider value={{ dificult, changeDificult, dificults: Dificult }}>
      {props.children}
    </config.Provider>
  );
}
