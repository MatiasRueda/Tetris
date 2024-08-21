import { Params } from "../type/type";
import { Method } from "./method";

const url = import.meta.env.VITE_LAMBDA_URL;

function login(username: string, password: string, token: string) {
  return `${url}/?method=${Method.Login}&username=${username}&password=${password}&token=${token}`;
}

function register(username: string, password: string, token: string) {
  return `${url}/?method=${Method.Register}&username=${username}&password=${password}&token=${token}`;
}

function score(username: string, score: string, token: string) {
  return `${url}/?method=${Method.Score}&username=${username}&score=${score}&token=${token}`;
}

export default function getURL(method: Method, token: string, params?: Params) {
  if (method === Method.Login)
    return login(params!.username, params!.password!, token);
  else if (method === Method.Register)
    return register(params!.username, params!.password!, token);
  else return score(params!.username, params!.score!, token);
}
