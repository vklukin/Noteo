import User from "../db/models/User";
import { IUserAttributes } from "../types/user";

export class UserController {
    static async isUserExist(email: string): Promise<boolean> {
        const res = await User.findOne({
            where: {
                email: email
            }
        });

        return res !== null;
    }

    static async Registrate(email: string, password: string) {
        await User.create({
            email,
            password,
            createdAt: new Date()
        });

        return "Пользователь был зарегистрирован";
    }

    static async GetUser(email: string): Promise<IUserAttributes | null> {
        return await User.findOne({
            where: {
                email: email
            },
            plain: true
        });
    }
}
