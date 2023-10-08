import { Express, Request, Response } from "express";

import { IRegistrationData } from "../../types/user";
import { UserController } from "../../controllers/Users";
import { PasswordController } from "../../utils/passwordManipulations";

const { Registrate, isUserExist } = UserController;

export default function (app: Express) {
    app.post(
        "/auth/registration",
        async (
            req: Request<Record<string, any>, Record<string, any>, IRegistrationData>,
            res: Response
        ) => {
            const { email, password } = req.body;

            if (!email) {
                res.status(404).json({ message: "Значение email не должно быть пустым" });
                return;
            }
            if (!password) {
                res.status(404).json({ message: "Значение password не должно быть пустым" });
                return;
            }

            const isUserExists = await isUserExist(email);

            if (isUserExists) {
                return res.status(403).json({
                    message: "Пользователь с таким email адресом уже существует"
                });
            }

            try {
                const hashedPassword = new PasswordController(password).encodePassword();
                const registationResponse = await Registrate(email, hashedPassword);

                return res.status(200).json({ message: registationResponse });
            } catch (e) {
                return res.status(500).json({
                    message: "В процессе регистрации произошла ошибка. Повторите операацию позже"
                });
            }
        }
    );
}
