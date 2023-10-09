import { Express, Request, Response } from "express";

import { ILoginData, ILoginResponse, IUserAttributes } from "../../types/user";
import { UserController } from "../../controllers/Users";
import { PasswordController } from "../../utils/passwordManipulations";
import { Token } from "../../utils/jwt";
import { IMessage } from "../../types/messages";

const { GetUser } = UserController;
const { generateAccess } = Token;

export default function (app: Express) {
    app.post(
        "/auth/login",
        async (
            req: Request<Record<string, any>, Record<string, any>, ILoginData>,
            res: Response<ILoginResponse | IMessage>
        ) => {
            const { email, password } = req.body;

            if (!email) {
                res.status(403).json({ message: "Значение email не должно быть пустым" });
                return;
            }
            if (!password) {
                res.status(403).json({ message: "Значение password не должно быть пустым" });
                return;
            }

            try {
                const candidate = await GetUser(email);

                if (!candidate) {
                    return res.status(404).json({
                        message: "Пользователь с таким email адресом не найден"
                    });
                }

                const pass = new PasswordController(password);
                if (!pass.comparePasswords(candidate.password)) {
                    return res.status(403).json({
                        message: "Введен не верный пароль"
                    });
                }

                const tokenPayload: Omit<IUserAttributes, "password"> = {
                    user_id: candidate.user_id,
                    email: candidate.email,
                    createdAt: candidate.createdAt,
                    updatedAt: candidate.updatedAt
                };

                return res.status(200).json({
                    id: candidate.user_id,
                    email: candidate.email,
                    token: generateAccess(tokenPayload),
                    createdAt: candidate.createdAt,
                    updatedAt: candidate.updatedAt
                });
            } catch (e) {
                return res
                    .status(500)
                    .json({ message: "В процессе авторизации произошла ошибка. Повторите позже" });
            }
        }
    );
}
