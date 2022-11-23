import Logo from '../assets/images/Logo.js';
import Arrow from '../assets/images/mainpage/Arrow';
import Ham from '../assets/images/mainpage/hamburger'
import Search from '../assets/images/mainpage/searchIcon.png'


const MainHeader = () => {
    return (
        <header className='mainHeader'>
            <div className="mainHeader__asideHamburger">
                <button><Ham /></button>
            </div>
            <div className="mainHeader__content">
                <label>
                    <img src={Search} alt="Search" />
                    <input type="text" placeholder='Поиск' />
                </label>
                <div className="mainHeader__appName">
                    <Logo/>
                    <p>Noteo</p>
                </div>
                <div className="mainHeader__avatar">
                    <div className="avatar"></div>
                    <Arrow />
                </div>
            </div>
        </header>
    );
}

export default MainHeader