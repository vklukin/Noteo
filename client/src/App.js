import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {ToastContainer} from "react-toastify";

import './assets/css/style.css';
import 'react-toastify/dist/ReactToastify.css'

import MainHeader from "./components/MainHeader";
import ShowNotes from "./components/ShowNotes";
import CreateNote from "./pages/CreateNote";

function App() {
    return (
        <div className="block__wrapper">
            <MainHeader/>
            <Router>
                <Routes>
                    <Route path="/" element={<ShowNotes/>}/>
                    <Route path="/create" element={<CreateNote/>}/>
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
