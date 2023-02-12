import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Register({ onRegister }) {

  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });
  let values;

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    };

    onRegister({
      password: values.password,
      email: values.email
    });   
  }

  return (
    <section className="authorization">
      <form className="form form_type_authorization" onSubmit={handleSubmit} noValidate >
        <h2 className="form__title form__title_type_authorization">Регистрация</h2>
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
            defaultValue=''
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
            defaultValue=''
          />
          {errors.password && (<span className="form__error_visible">{errors.password.message}</span>)}         
        </fieldset>
        <button className={`form__save-button form__save-button_type_authorization ${!isValid && 'form__save-button_disabled'}`} onClick={() => values = getValues()}  type="submit" disabled={!isValid}>Зарегистрироваться</button>
        <p className="form__caption">Уже зарегистрированы? <Link className="form__caption-link" to="/sign-in">Войти</Link></p>
      </form>
    </section>
  );
}

export default Register;