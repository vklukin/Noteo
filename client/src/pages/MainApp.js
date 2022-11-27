import Aside from "../components/Aside";
import MainHeader from "../components/MainHeader";
import Board from "../components/board";


const MainPage = () => {
    return (
        <>
            <div className="block__wrapper">
                <MainHeader/>
                <div className="wrapp">
                    <Aside/>
                    <Board/>
                </div>
            </div>
        </>
    );
}

export default MainPage;