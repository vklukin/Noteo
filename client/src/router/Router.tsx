import { Routes, Route } from "react-router-dom"

import { useMessage } from "../core/hooks/useMessage"

import MainHeader from "../components/MainHeader"
import ProtectedRoute from "../components/ProtectedRoute"
import CreateNote from "../pages/CreateNote"
import EditNote from "../pages/EditNote"
import ShowNotes from "../pages/ShowNotes"
import ErrorPage from "../pages/public/404/404"
import Login from "../pages/public/Registration"
import Registration from "../pages/public/Registration"

const { MessageContainer } = useMessage()

export const Router = () => {
    return (
        <div className="block__wrapper">
            <MainHeader />
            <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/" element={<ShowNotes />} />
                    <Route path="/create" element={<CreateNote />} />
                    <Route path="/edit/:id" element={<EditNote />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>

            <MessageContainer />
        </div>
    )
}
