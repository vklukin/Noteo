import { User } from "./../models/User";

export class UserController {
    static async Registrate(email: string, password: string) {
        await User.create({
            email,
            password
        });

        return "Пользователь был зарегистрирован";
    }
}
