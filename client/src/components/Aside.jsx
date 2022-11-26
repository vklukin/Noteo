import Note from "../assets/images/mainpage/icons/note";
import Garbage from "../assets/images/mainpage/icons/garbage";
import Favourite from "../assets/images/mainpage/icons/favourite";

const Aside = () => {
    return (
        <aside>
            <div className="mainCategories">
                <button data-cat="All" className="btn__cat btn__all">
                    <Note/>
                    <p>Все</p>
                </button>
                <button data-cat="Favourite" className="btn__cat btn__favourite">
                    <Favourite/>
                    <p>Избранные</p>
                </button>
                <button data-cat="Garbage" className="btn__cat btn__garbage">
                    <Garbage/>
                    <p>Корзина</p>
                </button>
            </div>
        </aside>
    );
}

export default Aside