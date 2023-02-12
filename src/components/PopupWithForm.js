function PopupWithForm({name, title, button, isOpen, onClose, children, onSubmit, isValid, onClickSubmit }) {
  
    return (
      <div className={`popup popup_type_${name} ${isOpen}`} onClick={isOpen ? ((evt) => evt.target === evt.currentTarget && onClose()) : undefined }>
        <div className="popup__container">
          <form className="form" name={name} onSubmit={onSubmit} noValidate >
            <h2 className="form__title">{title}</h2>
            <fieldset className="form__inputs">{children}</fieldset>
            <button className={`form__save-button ${!isValid && 'form__save-button_disabled'}`} onClick={onClickSubmit} type="submit" disabled={!isValid}>
              {button || "Сохранить"}
            </button>
          </form>
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

export default PopupWithForm;