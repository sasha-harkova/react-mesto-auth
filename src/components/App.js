import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] = useState(false);
  const [selectedCard, setIsPreviewCardPopupOpen] = useState(null);
  const [currentUser, setUserInfo] = useState({});
  const [deletingCard, setDeletingCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessfulSession, setIsSuccessfulSession]  = useState(false);
  const [currentEmail, getCurrentEmail] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  useEffect(() => {
    Promise.all([api.getUserInfoAndAvatar(), api.getInitialCards()])
      .then(([user, card]) => {
        setUserInfo(user);
        setCards(...cards, card);
      })
      .catch((error) =>
        console.log(`Ошибка при получении информации с сервера: ${error}`)
      );
  }, []);

  useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if(isOpen) {
      window.addEventListener("keydown", closeByEsc);

      return () => {
        window.removeEventListener('keydown', closeByEsc);
      }
    }    
  }, [isOpen]);

  useEffect(() => {
    checkToken();
  }, []);

  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function openInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsPreviewCardPopupOpen(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmationPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsPreviewCardPopupOpen(null);
    setDeletingCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка при изменении лайка: ${error}`));
  }

  function handleDeleteCardClick(card) {
    setDeletingCard(card);
    setIsDeleteConfirmationPopupOpen(true);
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка при удалении карточки: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .setUserInfo({ name, about })
      .then((user) => {
        setUserInfo(user);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при изменении информации о пользователе: ${error}`)
      )
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .setAvatar({ avatar })
      .then((user) => {
        setUserInfo(user);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка при изменении информации о пользователе: ${error}`)
      )
      .finally(() => setIsLoading(false));
  }

  function handleAddPlace({ name, link }) {
    setIsLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка при добавлении карточки: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function onLogin({ password, email }) {
    return auth.authorize(password, email).then((data) => {   
      if(data.token) {       
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        getCurrentEmail(email);
        navigate("/");
      }
    }).catch((error) => {
      console.log(error);
      setIsSuccessfulSession(false);
      openInfoTooltip();
    });
  }

  function onRegister({ password, email }) {
    return auth.register(password, email).then(() => {
      navigate("/sign-in");
      setIsSuccessfulSession(true);
    }).catch((error) => {
      console.log(error);
      setIsSuccessfulSession(false);
    }).finally(() => openInfoTooltip());
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        setLoggedIn(true);
        getCurrentEmail(res.data.email);
        navigate("/");
      });
    }
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false)
  }

  function burgerButtonClick() {
    setIsClicked(!isClicked)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          loggedIn={loggedIn} 
          onSignOut={onSignOut}
          currentEmail={currentEmail}
          onClick={burgerButtonClick}
          isCliked={isClicked}
        />
        <Routes>          
          <Route path="/" element={
            <ProtectedRoute 
              loggedIn={loggedIn} 
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDelete={handleDeleteCardClick}
              component={Main} 
            />}
          />
          <Route path="/sign-in" element={<Login onLogin={onLogin} onClosePopup={closeAllPopups} />} />
          <Route path="/sign-up" element={<Register onRegister={onRegister} onClosePopup={closeAllPopups} />} />
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />                
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          button={isLoading && "Сохранение..."}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          button={isLoading && "Сохранение..."}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          button={isLoading ? "Создание..." : "Создать"}
        />
        <DeleteConfirmationPopup
          isOpen={isDeleteConfirmationPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={deletingCard}
          button={isLoading ? "Удаление..." : "Да"}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} successfulSession={isSuccessfulSession} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
