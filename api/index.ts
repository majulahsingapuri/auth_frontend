import axios from "axios";
import * as types from "./types";

export const instance = axios.create({
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "x-csrftoken",
});

export const getter = (path: string) =>
    instance.get(path).then((res) => res.data);

export async function signOut() {
    return instance.post(`/accounts/logout/`);
}

export async function passwordSignIn(params: types.PasswordSignInParams) {
    return instance.post<types.ObtainPairResponse>(
        `/api/v1/token/pair`,
        params
    );
}

export async function signIn(args: types.AuthProviders) {
    switch (args.provider) {
        case "password":
            return passwordSignIn(args.params);
    }
}