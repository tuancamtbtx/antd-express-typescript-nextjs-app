import cookie from "cookie";
import { Request } from "express";

interface ICookieOption {
  sameSite: string;
  path: string;
  maxAge: number;
}

export const cookieOptions: ICookieOption = {
  sameSite: "lax",
  path: "/",
  maxAge: 30 * 24 * 60 * 60, // 30 days
};
const parseCookies: any = (
  req: Request,
  options: ICookieOption = cookieOptions
) => {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
};
export const saveCookie: any = (
  key: string,
  value: string,
  options: ICookieOption
) => {
  document.cookie = cookie.serialize(key, value, {
    ...options,
    domain: "http://localhost:3000",
  });
  document.cookie = cookie.serialize(key, value, options);
};
export default {
  get: (key, req, options = cookieOptions): string =>
    parseCookies(req, options)[key],
  save: (key, value, options = cookieOptions): void =>
    saveCookie(key, value, options),
};
