import { useState } from "react";
import axios from "axios";
import { Params } from "../type/type";

type Response<T> = {
  data: T;
  success: boolean;
  message: string;
};

enum KeyState {
  Main = "Main",
  Loading = "Loading",
  Error = "Error",
}

const baseURL = import.meta.env.VITE_LAMBDA_URL;

export default function useTetrisFetch<T>() {
  const [keyState, setKeyState] = useState<KeyState>(KeyState.Main);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const msgError = "An unexpected error occurred";

  const get = async (params?: Params): Promise<Response<T>> => {
    setLoading(true);
    setKeyState(KeyState.Loading);
    const url = axios.create({
      baseURL,
      params,
    });
    try {
      const response = (await url.get<Response<T>>("/")).data;
      setLoading(false);
      if (!response.success) {
        setKeyState(KeyState.Error);
        setError(response.message);
        return response;
      }
      setKeyState(KeyState.Main);
      return response;
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      setError(msgError);
      setKeyState(KeyState.Error);
      return {
        data: null as unknown as T,
        success: false,
        message: msgError,
      };
    }
  };

  const reset = () => {
    setLoading(false);
    setError(undefined);
    setKeyState(KeyState.Main);
  };

  return { loading, error, keyState, get, reset };
}
