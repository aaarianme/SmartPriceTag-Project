import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://localhost:5000/";

interface HttpOptions {
  onSuccess?: Function;
  onFail?: Function;
  finally?: Function;
}

export function useGetRequest() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [res, setRes] = useState({});

  /**
   * make an async get request
   * @param path the path
   * @param param url querys
   * @param httpsOptions onSuccess gets the response, finally always runs, catch runs on errors with the error object passed into it
   */
  const makeRequest = async (
    path: string,
    param?: any | null,
    httpsOptions?: HttpOptions
  ) => {
    setLoaded(false);
    await axios
      .get(path, { params: param })
      .then((Response: any) => {
        setRes(Response);
      })
      .then(() => {
        setLoaded(true);
        httpsOptions?.onSuccess?.(Response);
      })
      .catch((err: any) => httpsOptions?.onFail?.(err.response))
      .finally(() => httpsOptions?.finally?.());
  };
  return [loaded, res, makeRequest] as const;
}

export function PostRequest() {}

export function PutRequest() {}
export function DelRequest() {}
