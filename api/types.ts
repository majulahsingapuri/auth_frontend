export type ObtainPairResponse = {
    username: string;
    access: string;
    refresh: string;
};

export type RefreshPairResponse = {
    access: string;
    refresh: string;
};

export type SignUpParams = {
    provider: "password";
    params: PasswordSignUpParams;
};

export interface PasswordSignUpParams {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

export interface PasswordSignInParams {
    username: string;
    password: string;
}

export type PasswordProvider = {
    provider: "password";
    params: PasswordSignInParams;
};

export type AuthProviders = PasswordProvider