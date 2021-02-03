import cookie from "./cookie";
import { Request } from "express";
const AUTH_TOKEN: string = "authToken";

export const saveToken: any = (token: string) => {
  cookie.save(AUTH_TOKEN, "Bearer " + token);
};
export const getToken: any = (req: Request) => {
  return cookie.get(AUTH_TOKEN, req);
};
export const logout: any = (isRedirect: boolean = true) => {
  saveToken("");
  if (isRedirect) {
    window.location.href = "/login";
  }
};
