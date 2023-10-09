import { Express, Request, Response } from "express";

import { IMessage } from "../../types/messages";
import { IUserId } from "../../types/user";
import { INoteId } from "../../types/notes";

import Notes from "../../db/models/Notes";
import { NotesController } from "../../controllers/Notes";

const { getSoloNote, deleteNote } = NotesController;

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
                console.log(e);

                return res.status(500).json({ message: "Произошла ошибка. Повторите позже" });
            }
        }
    );

    app.delete(
        "/api/notes/:noteId",
        async (req: Request<INoteId, any, any, IUserId>, res: Response<IMessage>) => {
            const noteId = req.params.noteId;
            const userId = req.query.userId;

            if (!userId) {
                return res.status(404).json({ message: "Не найден id пользователя" });
            }
            if (!noteId) {
                return res.status(404).json({ message: "Не найден id заметки" });
            }

            try {
                const response = await deleteNote({ noteId, userId });

                if (!response) {
                    return res.status(410).json({
                        message:
                            "Не было удалено ни одной заметки. Вероятно данной заметки не существует"
                    });
                }

                return res.status(200);
            } catch (e) {
                console.log(e);

                return res.status(500).json({ message: "Произошла ошибка. Повторите позже" });
            }
        }
    );
}
