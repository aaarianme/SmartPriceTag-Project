import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://localhost:5000/";

interface HttpOptions {
  onSuccess: Function;
  onFail: Function | null;
  finally: Function | null;
}

export function useGetRequest() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [res, setRes] = useState({});

  var makeRequest = (path: string, param: any, httpsOptions: HttpOptions) => {
    axios.get(path).then((Response: any) => {
      setRes(res);
    });
  };
  return [loaded, res, makeRequest];
}

export function PostRequest() {}

export function PutRequest() {}
export function DelRequest() {}
