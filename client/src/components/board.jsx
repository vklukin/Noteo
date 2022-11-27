import NewNote from "../assets/images/mainpage/icons/newNote";
import Plus from "../assets/images/mainpage/icons/plus";

const Board = () => {
    return (
        <main className="board">
            <div className="board__controls">
                <button className="newNote">
                    <NewNote/>
                    <p>Новая заметка</p>
                    <Plus/>
                </button>
                {/*  Тут должна быть сортировка  */}
            </div>

            <div className="content__wrapper">
                {/*  Тут должны быть заметки  */}
            </div>
        </main>
    );
}

export default Board