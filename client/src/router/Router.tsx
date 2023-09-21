import { Routes, Route } from "react-router-dom";

import { useMessage } from "../core/hooks/useMessage";

import { RouterLayout } from "../core/layout/RouterLayout";
import { LoginPageLazy } from "../pages/public/Authorization/Login";
import MainHeader from "../components/MainHeader";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateNote from "../pages/CreateNote";
import EditNote from "../pages/EditNote";
import ShowNotes from "../pages/ShowNotes";
import ErrorPage from "../pages/public/404/404";
import Registration from "../pages/public/Authorization/Registration";

const { MessageContainer } = useMessage();

export const Router = () => {
    return (
        <div className="block__wrapper">
            <MainHeader />
            <Routes>
                <Route element={<RouterLayout />}>
                    <Route path="/" element={<ProtectedRoute />}>
                        <Route path="/" element={<ShowNotes />} />
                        <Route path="/create" element={<CreateNote />} />
                        <Route path="/edit/:id" element={<EditNote />} />
                    </Route>

                    <Route path="/login" element={<LoginPageLazy />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>

            <MessageContainer />
        </div>
    );
};
