import { db } from "../configs/db";
import { IUserAttributes } from "../types/user";
import User from "../db/models/User";

export class UserController {
    static async isUserExist(email: string): Promise<boolean> {
        const res = await db.models.User.findOne({
            where: {
                email: email
            }
        });

        return res !== null;
    }

    static async Registrate(email: string, password: string) {
        await db.models.User.create({
            email,
            password,
            createdAt: new Date()
        });

        return "Пользователь был зарегистрирован";
    }

    static async GetUser(email: string): Promise<IUserAttributes | null> {
        const response = await db.models.User.findOne({
            where: {
                email: email
            },
            plain: true
        });

        return response instanceof User ? response : null;
    }
}
