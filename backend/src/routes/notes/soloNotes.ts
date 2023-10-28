import { Express, Request, Response } from "express";

import { IMessage } from "../../types/messages";
import { IUserId } from "../../types/user";
import { INote, INoteId } from "../../types/notes";

import Notes from "../../db/models/Notes";
import { NotesController } from "../../controllers/Notes";

const { getSoloNote, deleteNote, createNote, updateNote } = NotesController;

export default function (app: Express) {
    app.get(
        "/api/notes/:noteId",
        async (
            req: Request<INoteId, any, any, IUserId>,
            res: Response<IMessage | Notes | null | undefined>
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
        async (req: Request<INoteId, any, any, IUserId>, res: Response<IMessage | undefined>) => {
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

    app.post(
        "/api/notes",
        async (
            req: Request<any, any, Omit<INote, "id">, IUserId>,
            res: Response<IMessage | undefined>
        ) => {
            const userId = req.query.userId;
            const { title, content } = req.body;

            if (!userId) {
                return res.status(404).json({ message: "Не найден id пользователя" });
            }
            if (!title && !content) {
                return res
                    .status(404)
                    .json({ message: "Не корректно введены поля title и content" });
            }

            try {
                await createNote(userId, { content, title });
                return res.status(200);
            } catch (e) {
                console.log(e);

                return res.status(500).json({ message: "Произошла ошибка. Повторите позже" });
            }
        }
    );

    app.put(
        "/api/notes/:noteId",
        async (req: Request<INoteId, any, INote, IUserId>, res: Response<IMessage | undefined>) => {
            const userId = req.query.userId;
            const { title, content, id: noteId } = req.body;

            if (!userId) {
                return res.status(404).json({ message: "Не найден id пользователя" });
            }
            if (!noteId) {
                return res.status(404).json({ message: "Не найден id заметки" });
            }
            if (!title && !content) {
                return res
                    .status(404)
                    .json({ message: "Не корректно введены поля title и content" });
            }

            try {
                const response = await updateNote(userId, { title, content, id: noteId });

                if (!response) {
                    return res.status(410).json({
                        message:
                            "Не было изменено ни одной заметки. Вероятно данной заметки не существует"
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
