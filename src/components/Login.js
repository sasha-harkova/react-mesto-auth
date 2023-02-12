import React, {useEffect} from "react";
import { useForm } from "react-hook-form";

function Login({ onLogin, onClosePopup }) {

  const {
    register,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });
  let values;

  useEffect(() => {
    reset()
  }, [onClosePopup]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    };

    onLogin({
      password: values.password,
      email: values.email
    });    
  }

  return (
    <section className="authorization">
      <form className="form form_type_authorization" onSubmit={handleSubmit} noValidate >
        <h2 className="form__title form__title_type_authorization">Вход</h2>
        <fieldset className="form__inputs">
          <input
            {...register("email", {
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Введите верный формат"
              },
              minLength: {
                value: 5,
                message: "Минимум 5 символов",
              },
              maxLength: {
                value: 40,
                message: "Максимум 40 символов",
              },
            })}
            id="email"
            name="email"
            autoComplete="email"
            className={`form__input form__input_type_authorization ${
              errors.email && "form__input_type_error"
            }`}
            type="email"
            placeholder="Email"
            defaultValue=""            
          />
          {errors.email && (<span className="form__error_visible">{errors.email.message}</span>)}
          <input
            {...register("password", {
              required: "Поле обязательно к заполнению",
              minLength: {
                value: 5,
                message: "Минимум 5 символов",
              },
              maxLength: {
                value: 40,
                message: "Максимум 40 символов",
              },
            })}
            id="password"
            name="password"
            autoComplete="current-password"
            className={`form__input form__input_type_authorization ${
              errors.password && "form__input_type_error"
            }`}
            type="password"
            placeholder="Пароль"
            defaultValue=""            
          />
          {errors.password && (<span className="form__error_visible">{errors.password.message}</span>)}         
        </fieldset>
        <button className={`form__save-button form__save-button_type_authorization ${!isValid && 'form__save-button_disabled'}`} 
          type="submit" 
          onClick={() => values = getValues()} 
          disabled={!isValid}>Войти</button>
      </form>
    </section>
  );
}

export default Login;