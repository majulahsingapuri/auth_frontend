import axios, { InternalAxiosRequestConfig } from "axios";
import * as types from "./types";

export const instance = axios.create({
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "x-csrftoken",
  withCredentials: true,
});

export const getter = (path: string) =>
  instance.get(path).then((res) => res.data);

export async function signOut(params: types.SignOutParams) {
  return instance.post(`/api/v1/token/logout`, params);
}

export async function passwordSignIn(
  params: types.PasswordSignInParams,
) {
  return instance.post<types.ObtainPairResponse>(
    `/api/v1/token/pair`,
    params,
  );
}

export async function signIn(args: types.AuthProviders) {
  switch (args.provider) {
    case "password":
      return passwordSignIn(args.params);
  }
}

export async function refreshToken(
  params: types.RefreshPairParams,
) {
  return instance.post<types.RefreshPairResponse>(
    `/api/v1/token/refresh`,
    params,
  );
}

export async function passwordSignUp(
  params: types.PasswordSignUpParams,
) {
  return instance.post<types.UserResponse>(
    `/api/v1/users`,
    params,
  );
}

export async function signUp(args: types.SignUpProviders) {
  switch (args.provider) {
    case "password":
      return passwordSignUp(args.params);
  }
}

export async function getMe() {
  return instance.get<types.UserResponse>(
    `/api/v1/users/me`,
  );
}

export async function verifyToken(
  params: types.VerifyTokenParams,
) {
  return instance.post(`/api/v1/token/verify`, params);
}
