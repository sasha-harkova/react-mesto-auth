import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`content__like ${isLiked && 'content__like_active'}`);

  function handleClick() {
    onCardClick(card);    
  }  

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="content__card">
      <img
        className="content__photo"
        src={card.link}
        alt={`${card.name}. Иллюстрация`}
        onClick={handleClick}
      />
      <div className="content__caption-container">
        <p className="content__place-name">{card.name}</p>
        <div className="content__like-container">
          <button
            className={cardLikeButtonClassName}
            aria-label="Поставить лайк на фото"
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="content__like-sum">{card.likes.length}</p>
        </div>
      </div>
      {isOwn &&  
      <button
        className="content__delete"
        aria-label="Удалить фото"
        type="button"
        onClick={handleDeleteClick}
      ></button>}
    </div>
  );
}

export default Card