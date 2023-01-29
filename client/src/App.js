import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";

import ErrorPage from "./pages/404";
import MainHeader from "./components/MainHeader";
import ShowNotes from "./pages/ShowNotes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  useEffect(() => {
    window.history.pushState({}, "", window.location.href);
  }, []);
  return (
    <div className="block__wrapper">
      <MainHeader />

      <Router>
        <Routes>
          <Route path="/" element={<ShowNotes />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>

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
  );
}

export default App;
