import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, button }) {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } = useFormAndValidation();

  useEffect(() => {
    resetForm();
    setIsValid(false);
  }, [isOpen]);


  function handleSubmit(e){
    e.preventDefault();

    onAddPlace({ 
      name: values.cardname, 
      link: values.cardlink
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      button={button}
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      onAddPlace={onAddPlace}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="cardname"
        name="cardname"
        className={`form__input form__input_el_place-name ${
          errors.cardname && "form__input_type_error"
        }`}
        type="text"
        placeholder="Назание"
        minLength='2'
        maxLength='30'
        required
        value={values.cardname || ''}
        onChange={handleChange} 
      />
      {errors.cardname && (
        <span className="form__error_visible">
          {errors.cardname}
        </span>
      )}
      <input
        id="cardlink"
        name="cardlink"
        className={`form__input popup__input_el_link ${
          errors.cardlink && "form__input_type_error"
        }`}
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={values.cardlink || ''}
        onChange={handleChange} 
      />
      {errors.cardlink && (
        <span className="form__error_visible">
          {errors.cardlink}
        </span>
      )}
    </PopupWithForm>
  );
}

export default AddPlacePopup;