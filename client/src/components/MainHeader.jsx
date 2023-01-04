import Logo from '../assets/images/Logo.js';

const MainHeader = () => {
    return (
        <header className='mainHeader'>
            <div className="mainHeader__content">
                <div className="mainHeader__appName">
                    <Logo/>
                    <p>Noteo</p>
                </div>
            </div>
        </header>
    );
}

export default MainHeader