import { Express, Response, Request } from "express";

import { IMessage } from "../../types/messages";
import { NotesController } from "../../controllers/Notes";
import Notes from "../../db/models/Notes";

const { getAllNotes } = NotesController;

export default function (app: Express) {
    app.get(
        `/api/notes`,
        async (req: Request<{ userId: string }>, res: Response<IMessage | Notes[]>) => {
            const userId = req.params.userId;

            if (!userId) {
                return res.status(404).json({ message: "Не найден id пользователя" });
            }

            try {
                const response = await getAllNotes(userId);
                return res.status(200).send(response);
            } catch (e) {
                return res.status(500).json({ message: "Произошла ошибка. Повторите позже" });
            }
        }
    );
}
