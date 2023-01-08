import {GetNote} from "../controllers/GetNotes";

import NewNote from "../assets/images/mainpage/icons/newNote";
import Plus from "../assets/images/mainpage/icons/plus";
import ThreeDots from "../assets/images/mainpage/icons/threeDots";

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
                        <div className="card" key={item.id}>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>

                            <hr/>
                            <div className="manual-items">
                                <button className="card-button" data-id={item.id}><ThreeDots/></button>

                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    );
}

export default ShowNotes