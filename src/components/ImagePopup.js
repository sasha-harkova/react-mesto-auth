function ImagePopup({card, onClose}) {
  return(
    <div className={`popup popup_type_for-image ${card ? "popup_opened" : ''}`} onClick={(evt) => evt.target === evt.currentTarget && onClose()}>
    <figure className="popup__container-image">
      <img
        className="popup__image"
        src={card?.link}
        alt={card ? `${card.name}. Иллюстрация` : ''}
      />
      <figcaption className="popup__place-name">{card?.name}</figcaption>
      <button
        className="popup__close-button"
        aria-label="Закрыть"
        type="button"
        onClick={onClose}
      ></button>
    </figure>
  </div>
  )
}

export default ImagePopup;