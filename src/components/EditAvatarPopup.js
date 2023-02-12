import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, button }) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    getValues
  } = useForm({
    mode: "all",
  });
  let values;

  useEffect(() => {
    reset()
  }, [isOpen]);

  function onSubmit() {
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
      onSubmit={handleSubmit(onSubmit)}
      onUpdateAvatar={onUpdateAvatar}
      button={button}
      isValid={isValid}
      onClickSubmit={() => {
        values = getValues();
      }}
    >
      <input 
      {...register('avatarlink', {
        required: "Поле обязательно к заполнению",
        pattern: {
          value:
            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
          message: "Укажите верную ссылку",
        }
      })}
        id="avatarlink"
        name="avatarlink"
        className={`form__input form__input_el_avatar ${
          errors.avatarlink && "form__input_type_error"
        }`}
        type="url"
        placeholder="Ссылка на новый аватар"
        defaultValue=""
        
      />
      {errors.avatarlink && (
        <span className="form__error_visible" id="username-error">
          {errors.avatarlink.message}
        </span>
      )}
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
