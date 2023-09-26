import { Routes, Route } from "react-router-dom";

import { RouterLayout } from "../core/layout/RouterLayout";
import { ProtectRoute } from "../core/layout/ProtectRoute";
import { LoginPageLazy } from "../pages/public/Authorization/Login";
import { RegistrationPageLazy } from "../pages/public/Authorization/Registration/index";
import { NotFoundPageLazy } from "../pages/public/404";
import { MainPageLazy } from "../pages/private/ShowNotes";
import { CreateNotePageLazy } from "../pages/private/CreateNote";
import { EditNotePageLazy } from "../pages/private/EditNote";

export const Router = () => {
    return (
        <RouterLayout>
            <Routes>
                <Route element={<ProtectRoute />}>
                    <Route path="/:userId/notes" element={<MainPageLazy />} />
                    <Route
                        path="/:userId/note/create"
                        element={<CreateNotePageLazy />}
                    />
                    <Route
                        path="/:userId/note/edit/:id"
                        element={<EditNotePageLazy />}
                    />
                </Route>

                <Route path="/" element={<LoginPageLazy />} />
                <Route
                    path="/registration"
                    element={<RegistrationPageLazy />}
                />
                <Route path="*" element={<NotFoundPageLazy />} />
            </Routes>
        </RouterLayout>
    );
};
