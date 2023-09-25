import { Routes, Route } from "react-router-dom";

import { RouterLayout } from "../core/layout/RouterLayout";
import { LoginPageLazy } from "../pages/public/Authorization/Login";
import { RegistrationPageLazy } from "../pages/public/Authorization/Registration/index";
import { NotFoundPageLazy } from "../pages/public/404";
import { ProtectRoute } from "../core/layout/ProtectRoute";
import CreateNote from "../pages/CreateNote";
import EditNote from "../pages/EditNote";
import { MainPageLazy } from "../pages/private/ShowNotes";

export const Router = () => {
    return (
        <RouterLayout>
            <Routes>
                <Route element={<ProtectRoute />}>
                    <Route path="/:userId/notes" element={<MainPageLazy />} />
                    <Route
                        path="/:userId/note/create"
                        element={<CreateNote />}
                    />
                    <Route
                        path="/:userId/note/edit/:id"
                        element={<EditNote />}
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
