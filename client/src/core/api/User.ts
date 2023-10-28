import { Api } from "../configs/api";
import { IUser } from "../models/user";
import { IMessage } from "../types/serverResponses";

export class UserApi {
    static async Registrate(userObj: { email: string; password: string }) {
        return await Api.post<IMessage>("/auth/registration", userObj);
    }

    static async Login(userObj: { email: string; password: string }) {
        return await Api.post<IUser>("/auth/login", userObj);
    }
}
