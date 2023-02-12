import PopupWithForm from "./PopupWithForm";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, button }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({
    mode: "all",
  });
  let values;

  function onSubmit() {
    onUpdateUser({
      name: values.username,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      onUpdateUser={onUpdateUser}
      button={button}
      isValid={isValid}
      onClickSubmit={() => {
        values = getValues();
      }}
    >
      <input
        {...register("username", {
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          maxLength: {
            value: 40,
            message: "Максимум 40 символов",
          },
        })}
        id="username"
        name="username"
        className={`form__input form__input_el_name ${
          errors.username && "form__input_type_error"
        }`}
        type="text"
        placeholder="Введите имя"
        defaultValue={currentUser.name}
      />
      {errors.username && (
        <span className="form__error_visible">
          {errors.username.message}
        </span>
      )}
      <input
        {...register("about", {
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          maxLength: {
            value: 40,
            message: "Максимум 200 символов",
          },
        })}
        id="about"
        name="about"
        className={`form__input form__input_el_job ${
          errors.about && "form__input_type_error"
        }`}
        type="text"
        placeholder="Расскажите о себе"
        defaultValue={currentUser.about}
      />
      {errors.about && (
        <span className="form__error_visible">
          {errors.about.message}
        </span>
      )}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
