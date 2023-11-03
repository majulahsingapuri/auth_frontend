// Interface for raw types, Type for complex types

export interface UserResponse {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface UserDoesNotExistResponse {
    detail: string;
}

export interface ObtainPairResponse {
    username: string;
    access: string;
    refresh: string;
};

export interface RefreshPairResponse {
    access: string;
    refresh: string;
};

export interface RefreshPairParams {
    refresh: string;
}

export type PasswordSignUpProvider = {
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

export type SignUpProviders = PasswordSignUpProvider

export interface UpdateUserParams {
    firstName: string;
    lastName: string;
}