import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, button }) {
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
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      onClickSubmit={() => {
        values = getValues();
      }}
    >
      <input
        {...register("cardname", {
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          maxLength: {
            value: 30,
            message: "Максимум 30 символов",
          },
        })}
        id="cardname"
        name="cardname"
        className={`form__input form__input_el_place-name ${
          errors.cardname && "form__input_type_error"
        }`}
        type="text"
        placeholder="Назание"
        defaultValue=""
      />
      {errors.cardname && (
        <span className="form__error_visible">
          {errors.cardname.message}
        </span>
      )}
      <input
        {...register("cardlink", {
          required: "Поле обязательно к заполнению",
          pattern: {
            value:
              /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
            message: "Укажите верную ссылку",
          },
        })}
        id="cardlink"
        name="cardlink"
        className={`form__input popup__input_el_link ${
          errors.cardlink && "form__input_type_error"
        }`}
        type="url"
        placeholder="Ссылка на картинку"
        defaultValue=""
      />
      {errors.cardlink && (
        <span className="form__error_visible">
          {errors.cardlink.message}
        </span>
      )}
    </PopupWithForm>
  );
}

export default AddPlacePopup;