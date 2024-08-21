import { Method } from "../utils/method";

export type Params = {
  username?: string;
  token: string;
  method: Method;
  password?: string;
  score?: string;
};

export type User = {
  username: string;
  score: string;
};
