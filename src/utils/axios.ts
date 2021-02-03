import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "./auth";

declare var global;
global.headers = {
  Accept: "application/json",
};
global.authToken = "";

export function setGlobalAuthToken(authToken) {
  if (authToken) {
    global.authToken = authToken;
  }
}
export function setGlobalHeaders(headers) {
  if (headers) {
    global.headers = {
      ...global.headers,
      ...headers,
    };
  }
}

const buildConfig = (timeout: number): AxiosRequestConfig => {
  const conf: AxiosRequestConfig = {
    timeout: timeout,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("tokenAccess")}`,
    },
  };
  return conf;
};
