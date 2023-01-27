import Logo from '../assets/images/Logo.js'

const MainHeader = () => {
	return (
		<header className="mainHeader">
			<div className="mainHeader__content">
				<a className="mainHeader__appName" href="/">
					<Logo />
					<p>Noteo</p>
				</a>
			</div>
		</header>
	)
}

export default MainHeader
