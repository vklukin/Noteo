import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import './assets/css/style.css';

import MainHeader from "./components/MainHeader";
import Board from "./components/board";
import CreateNote from "./pages/CreateNote";

function App() {
    return (
        <div className="block__wrapper">
            <MainHeader/>
            <Router>
                <Routes>
                    <Route path="/" element={<Board/>}/>
                    <Route path="/create" element={<CreateNote/>}/>
                </Routes>
            </Router>

        </div>

    );
}

export default App;
