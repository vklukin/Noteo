import { Express, Request, Response } from "express";

import { IMessage } from "../../types/messages";
import { IUserId } from "../../types/user";
import { INoteId } from "../../types/notes";

import Notes from "../../db/models/Notes";
import { NotesController } from "../../controllers/Notes";

const { getSoloNote } = NotesController;

export default function (app: Express) {
    app.get(
        "/api/notes/:noteId",
        async (
            req: Request<INoteId, any, any, IUserId>,
            res: Response<IMessage | Notes | null>
        ) => {
            const noteId = req.params.noteId;
            const userId = req.query.userId;

            if (!userId) {
                return res.status(404).json({ message: "Не найден id пользователя" });
            }
            if (!noteId) {
                return res.status(404).json({ message: "Не найден id заметки" });
            }

            try {
                const response = await getSoloNote({ noteId, userId });

                if (!response) {
                    return res.status(404).json({ message: "Заметок с указанным id не найдено" });
                }

                return res.status(200).send(response);
            } catch (e) {
                return res.status(500).json({ message: "Произошла ошибка. Повторите позже" });
            }
        }
    );
}
