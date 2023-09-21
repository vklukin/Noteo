import { Routes, Route } from "react-router-dom"

import { RouterLayout } from "../core/layout/RouterLayout"
import { ProtectRoute } from "../core/layout/ProtectRoute"
import { LoginPageLazy } from "../pages/public/Authorization/Login"
import { RegistrationPageLazy } from "../pages/public/Authorization/Registration/index"
import { _404Lazy } from "../pages/public/404"
import CreateNote from "../pages/CreateNote"
import EditNote from "../pages/EditNote"
import ShowNotes from "../pages/ShowNotes"

export const Router = () => {
    return (
        <RouterLayout>
            <Routes>
                <Route element={<ProtectRoute />}>
                    <Route path="/" element={<ShowNotes />} />
                    <Route path="/create" element={<CreateNote />} />
                    <Route path="/edit/:id" element={<EditNote />} />
                </Route>

                <Route path="/login" element={<LoginPageLazy />} />
                <Route path="/registration" element={<RegistrationPageLazy />} />
                <Route path="*" element={<_404Lazy />} />
            </Routes>
        </RouterLayout>
    )
}
