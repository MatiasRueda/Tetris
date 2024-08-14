import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../type/type";

type UserContext = {
  info?: User;
  login: (user: User) => void;
  updateScore: (newScore: number) => void;
  isMaxScore: (score: number) => void;
  unlogin: () => void;
};
const user = createContext<UserContext | undefined>(undefined);

export function useUserContext() {
  return useContext(user)!;
}

export default function UserContext(props: { children: ReactNode }) {
  const [info, setInfo] = useState<User | undefined>(undefined);

  const login = (user: User) => {
    setInfo({ ...(info || {}), ...user });
  };

  const updateScore = (newScore: number) => {
    setInfo({ ...info!, score: newScore.toString() });
  };

  const isMaxScore = (score: number) => {
    return info?.score && score > Number(info?.score);
  };

  const unlogin = () => {
    setInfo(undefined);
  };

  return (
    <user.Provider value={{ info, login, updateScore, isMaxScore, unlogin }}>
      {props.children}
    </user.Provider>
  );
}
