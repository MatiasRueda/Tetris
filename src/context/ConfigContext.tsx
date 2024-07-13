import { createContext, ReactNode, useContext, useState } from "react";

export enum Difficulty {
  Easy,
  Medium,
  Hard,
}

type Config = {
  difficulty: Difficulty;
  changeDifficulty: (difficulty: Difficulty) => void;
};

const config = createContext<Config | undefined>(undefined);

export function useConfigContext() {
  return useContext(config)!;
}

export default function ConfigContext(props: { children: ReactNode }) {
  const [difficulty, setDifficulty] = useState(Difficulty.Medium);

  const changeDifficulty = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
  };

  return (
    <config.Provider value={{ difficulty, changeDifficulty }}>
      {props.children}
    </config.Provider>
  );
}
