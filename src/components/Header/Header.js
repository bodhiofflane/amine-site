import { Link, NavLink } from "react-router-dom";

import './header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="header__grid-container">
                <nav className="header__navigation">
                    <h1
                        className="header__title">
                        <Link to="/">Anime-site</Link>
                    </h1>
                    <NavLink
                        className={({isActive}) => {
                            return 'header__link ' + (isActive ? 'header__link-active' : ' ')
                        }}
                        to="/"
                    >
                        Home
                    </NavLink>
                    <a className="header__link" href="google.com">Developers</a>
                    <a className="header__link" href="google.com">Beta</a>
                    <a className="header__link" href="google.com">Prising</a>
                </nav>
                <div className="header__sing-in">
                    <button className="btn">Start your project</button>
                    <a className="header__sing-in-link" href="google.com">Sing In</a>
                </div>

            </div>
        </header>
    );
}

export default Header;