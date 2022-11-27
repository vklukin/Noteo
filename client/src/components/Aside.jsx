import Note from "../assets/images/mainpage/icons/note";
import Garbage from "../assets/images/mainpage/icons/garbage";
import Favourite from "../assets/images/mainpage/icons/favourite";

const Aside = () => {
    window.addEventListener('click', (e) => {
        if (e.target.dataset.cat) {

            let allButtons = document.querySelectorAll('button');
            for (let btn of allButtons) {
                btn.classList.remove('btn__active');
            }

            const button = e.target;
            button.classList.add('btn__active')

        }
    })

    return (
        <aside>
            <div className="mainCategories">
                <div className="mainCategories__wrapper">
                    <button data-cat="All" className="btn__cat btn__all btn__active">
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
                <hr/>
            </div>
        </aside>
    );
}

export default Aside