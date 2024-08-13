import { Params } from "../type/type";
import { Method } from "./method";

const url = import.meta.env.VITE_LAMBDA_URL;

function login(username: string, password: string) {
  return `${url}/?method=${Method.Login}&username=${username}&password=${password}`;
}

function register(username: string, password: string) {
  return `${url}/?method=${Method.Register}&username=${username}&password=${password}`;
}

function score(username: string, maxScore: number) {
  return `${url}/?method=${Method.Score}&username=${username}&score=${maxScore}`;
}

export default function getURL(method: Method, params: Params) {
  if (method === Method.Login) return login(params.username, params.password!);
  else if (method === Method.Register)
    return register(params.username, params.password!);
  else return score(params.username, params.maxScore!);
}
