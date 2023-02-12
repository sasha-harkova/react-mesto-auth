import logo from "../images/header_logo.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header({ loggedIn, onSignOut, currentEmail, onClick, isCliked }) {
  return (
    <header className={`header ${loggedIn && "header_type_logged-in"}`}>
      <div className="header__logo-container">
        <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        {loggedIn && 
        <button className={`header__button ${isCliked && "header__button_active"}`} type="button" onClick={onClick}>
        </button>}
      </div>      
      <Routes>
        <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
        <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>} />
        <Route path="/" element={
          <div className={`header__container ${isCliked && "header__container_visible"}`}>
            <p className="header__email">{currentEmail}</p>
            <Link className="header__link header__link_type_logged-out" onClick={onSignOut} to="/sign-in">Выйти</Link>
          </div>} />
      </Routes>
    </header>
  );
}

export default Header;
