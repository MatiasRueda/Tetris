import { useEffect, useState } from "react";
import { Method } from "../utils/method";
import getURL from "../utils/url";
import axios from "axios";
import { Params } from "../type/type";

type Response<T> = {
  data: T;
  successs: boolean;
  message: string;
};

export default function useTetrisFetch<T>() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const get = async (method: Method, params: Params) => {
    setLoading(true);
    const url = getURL(method, params);
    try {
      const response = (await axios.get<Response<T>>(url)).data;
      setLoading(false);
      if (!response.successs) {
        setError(response.message);
        return;
      }
      return response;
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      setError(err.message);
    }
  };

  return { loading, error, get };
}
