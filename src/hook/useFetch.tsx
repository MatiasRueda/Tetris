import { useState } from "react";
import { Method } from "../utils/method";
import getURL from "../utils/url";
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

export default function useTetrisFetch<T>(errorMsg?: string) {
  const [keyState, setKeyState] = useState<KeyState>(KeyState.Main);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const msgError = "An unexpected error occurred";

  const get = async (
    method: Method,
    token: string,
    params?: Params
  ): Promise<Response<T>> => {
    setLoading(true);
    setKeyState(KeyState.Loading);
    const url = getURL(method, token, params);
    try {
      const response = (await axios.get<Response<T>>(url)).data;
      setLoading(false);
      if (!response.success) {
        setKeyState(KeyState.Error);
        setError(response.message);
        return response;
      }
      setKeyState(KeyState.Main);
      return response;
    } catch (err: any) {
      setLoading(false);
      setError(errorMsg ? errorMsg : msgError);
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
