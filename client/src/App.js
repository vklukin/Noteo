import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainHeader from "./components/MainHeader";

//public
import ErrorPage from "./pages/404";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

//protected
import ShowNotes from "./pages/ShowNotes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";

function App() {
  useEffect(() => {
    window.history.pushState({}, "", window.location.href);
  }, []);
  return (
    <AuthProvider>
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

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
      </div>
    </AuthProvider>
  );
}

export default App;
