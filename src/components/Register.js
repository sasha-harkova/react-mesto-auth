import React, { useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";
import { Link } from "react-router-dom";

function Register({ onRegister, onClosePopup }) {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } = useFormAndValidation();  

  useEffect(() => {
    resetForm();
    setIsValid(false);
  }, []);

  useEffect(() => {
    resetForm();
  }, [onClosePopup]);

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
            id="email"
            name="email"
            autoComplete="email"
            className={`form__input form__input_type_authorization ${
              errors.email && "form__input_type_error"
            }`}
            type="email"
            placeholder="Email"
            required
            value={values.email || ''}
            onChange={handleChange} 
          />
          {errors.email && (<span className="form__error_visible">{errors.email}</span>)}
          <input
            id="password"
            name="password"
            autoComplete="current-password"
            className={`form__input form__input_type_authorization ${
              errors.password && "form__input_type_error"
            }`}
            type="password"
            placeholder="Пароль"
            minLength='8'
            maxLength='30'
            required
            value={values.password || ''}
            onChange={handleChange} 
          />
          {errors.password && (<span className="form__error_visible">{errors.password}</span>)}         
        </fieldset>
        <button className={`form__save-button form__save-button_type_authorization ${!isValid && 'form__save-button_disabled'}`} 
          type="submit" 
          disabled={!isValid}>Зарегистрироваться</button>
        <p className="form__caption">Уже зарегистрированы? <Link className="form__caption-link" to="/sign-in">Войти</Link></p>
      </form>
    </section>
  );
}

export default Register;