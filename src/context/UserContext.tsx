import { createContext, ReactNode, useContext, useState } from "react";

type User = {
  username: string;
  password: string;
  score: number;
};

type UserContext = {
  info?: User;
  login: (user: User) => void;
};
const user = createContext<UserContext | undefined>(undefined);

export function useUserContext() {
  return useContext(user)!;
}

export default function UserContext(props: { children: ReactNode }) {
  const [info, setInfo] = useState<User>();

  const login = (user: User) => {
    setInfo(user);
  };

  return (
    <user.Provider value={{ info, login }}>{props.children}</user.Provider>
  );
}
