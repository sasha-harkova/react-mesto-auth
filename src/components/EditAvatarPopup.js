import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, button }) {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } = useFormAndValidation();


  useEffect(() => {
    resetForm();
    setIsValid(false);
  }, [isOpen]);

  function handleSubmit(e){
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.avatarlink,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateAvatar={onUpdateAvatar}
      button={button}
      isValid={isValid}
    >
      <input 
        id="avatarlink"
        name="avatarlink"
        className={`form__input form__input_el_avatar ${
          errors.avatarlink && "form__input_type_error"
        }`}
        type="url"
        placeholder="Ссылка на новый аватар"
        required
        value={values.avatarlink || ''}
        onChange={handleChange} 
        
      />
      {errors.avatarlink && (
        <span className="form__error_visible">
          {errors.avatarlink}
        </span>
      )}
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
