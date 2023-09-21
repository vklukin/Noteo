import Logo from "../assets/images/Logo.js";

const MainHeader = () => {
    return (
        <header className="mainHeader">
            <a className="mainHeader__appName" href="/">
                <Logo />
                <p>Noteo</p>
            </a>
        </header>
    );
};

export default MainHeader;
