import { useState } from "react";
import axios, { AxiosPromise } from "axios";
axios.defaults.withCredentials = true;

var isDev = true;
if (isDev) {
  axios.defaults.baseURL = "https://localhost:5000";
} else {
  axios.defaults.baseURL = "https://sptwebapp.azurewebsites.net/";
}
axios.defaults.withCredentials = true;
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
  async function makeRequest(
    path: string,
    param?: any | null,
    httpsOptions?: HttpOptions
  ) {
    setLoaded(false);
    await axios
      .get(path, { params: param })
      .then((Response: any) => {
        setRes(Response.data);
        setLoaded(true);
        httpsOptions?.onSuccess?.(Response);
      })
      .catch((err: any) => httpsOptions?.onFail?.(err.response))
      .finally(() => httpsOptions?.finally?.());
  }
  return [loaded, res, makeRequest] as const;
}

export function usePostRequest() {
  async function makeRequest(
    path: string,
    param?: any | null,
    httpsOptions?: HttpOptions
  ) {
    await axios
      .post(path, param)
      .then((Response: any) => {
        httpsOptions?.onSuccess?.(Response);
      })
      .catch((err: any) => httpsOptions?.onFail?.(err.response))
      .finally(() => httpsOptions?.finally?.());
  }
  return makeRequest;
}

export function PutRequest() {}
export function useDeleteRequest() {
  async function makeRequest(
    path: string,
    payload?: any | null,
    httpsOptions?: HttpOptions
  ) {
    await axios
      .delete(path, { data: payload })
      .then((Response: any) => {
        httpsOptions?.onSuccess?.(Response);
      })
      .catch((err: any) => httpsOptions?.onFail?.(err.response))
      .finally(() => httpsOptions?.finally?.());
  }
  return makeRequest;
}
