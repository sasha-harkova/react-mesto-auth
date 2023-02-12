import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onCardClick,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
        </div>
        <div className="profile__info-container">
          <div className="profile__username-container">
            <h1 className="profile__username">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              aria-label="Редактировать профиль"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__user-description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="Добавить изображение"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="content">
        {cards.map((item) => (
          <Card
            card={item}
            key={item._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
