export interface RegisterUserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface RegisterUserOutput {
    isSuccessful: boolean
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface LoginUserOutput {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenInput {
    refreshToken: string;
}

export interface RefreshTokenOutput {
    accessToken: string;
    refreshToken: string;
}