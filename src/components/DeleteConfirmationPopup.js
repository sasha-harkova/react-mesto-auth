import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";

function DeleteConfirmationPopup({ isOpen, onClose, onDeleteCard, card, button }) {
  const {
    formState: { isValid },
    handleSubmit,
  } = useForm();


  function onSubmit() {
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      name="are-you-sure"
      title="Вы уверены?"
      button={button}
      onSubmit={handleSubmit(onSubmit)}
      onDeleteCard={onDeleteCard}
      isValid={isValid}
    />
  );
}

export default DeleteConfirmationPopup;
