import React from "react";
import successIcon from "../images/sign_in__ok.svg";
import errorIcon from "../images/sign_in__error.svg";

function InfoTooltip({ isOpen, onClose, successfulSession }) {
  return (
    <div className={`popup popup_type_info-tooltip ${isOpen && "popup_opened"}`} onClick={isOpen ? ((evt) => evt.target === evt.currentTarget && onClose()) : undefined }>
      <div className="popup__container">
        <img className="popup__icon" src={successfulSession ? successIcon : errorIcon} />
        <p className="popup__text">{successfulSession ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={onClose} 
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;