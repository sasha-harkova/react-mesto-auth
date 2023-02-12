import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, button }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, setIsValid } = useFormAndValidation();

  useEffect(() => {
    setValues(currentUser);
    setIsValid(false);
  }, [currentUser, isOpen])

  function handleSubmit(e){
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateUser={onUpdateUser}
      button={button}
      isValid={isValid}
    >
      <input
        id="name"
        name="name"
        className={`form__input form__input_el_name ${
          errors.name && "form__input_type_error"
        }`}
        type="text"
        placeholder="Введите имя"
        minLength='2'
        maxLength='40'
        required
        value={values.name || ''}
        onChange={handleChange}        
      />
      {errors.name && (
        <span className="form__error_visible">
          {errors.name}
        </span>
      )}
      <input
        id="about"
        name="about"
        className={`form__input form__input_el_job ${
          errors.about && "form__input_type_error"
        }`}
        type="text"
        placeholder="Расскажите о себе"
        minLength='2'
        maxLength='200'
        required
        value={values.about || ''}
        onChange={handleChange}
      />
      {errors.about && (
        <span className="form__error_visible">
          {errors.about}
        </span>
      )}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
