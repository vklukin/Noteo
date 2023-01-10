import {GetNote} from "../controllers/GetNotes";

import NewNote from "../assets/images/mainpage/icons/newNote";
import Plus from "../assets/images/mainpage/icons/plus";
import ShowNotesOnBoard from "./ShowNotesOnBoard";

const ShowNotes = () => {
    const data = GetNote()

    return (
        <main className="board">
            <div className="board__controls">
                <form action="/create" method="get">
                    <button className="newNote">
                        <NewNote/>
                        <p>Новая заметка</p>
                        <Plus/>
                    </button>
                </form>
                {/*  Тут должна быть сортировка  */}
            </div>

            <div className="content__wrapper">
                {data.map(item => {
                    return (
                        <ShowNotesOnBoard key={item.id} id={item.id} title={item.title} text={item.text}/>
                    )
                })}
            </div>
        </main>
    );
}

export default ShowNotes