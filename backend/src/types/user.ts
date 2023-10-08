export interface IRegistrationData {
    email: string | undefined;
    password: string | undefined;
}

export interface ILoginData {
    email: string | undefined;
    password: string | undefined;
}

export interface ILoginResponse {
    id: number;
    token: string;
    email: string;
    createdAt: Date;
    updatedAt: Date | null;
}

export interface IUserAttributes {
    user_id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date | null;
}
