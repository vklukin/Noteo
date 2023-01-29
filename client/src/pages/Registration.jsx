import React, { useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  useEffect(() => {
    document.title = "Noteo - Регистрация";
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="loginPage">
      <form onSubmit={handleFormSubmit}>
        <h1>Регистрация</h1>
        <div className="inputs">
          <div className="input-wrapper">
            <label htmlFor="email" className="labelRed">
              Почта
            </label>
            <input
              type="text"
              placeholder="Введите почту"
              value={email}
              id="email"
              className="input input-email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password" className="labelRed">
              Пароль
            </label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={firstPassword}
              id="password"
              className="input input-password"
              onChange={(e) => setFirstPassword(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password" className="labelRed">
              Повторите пароль
            </label>
            <input
              type="password"
              placeholder="Повторите пароль"
              value={secondPassword}
              id="password"
              className="input input-password"
              onChange={(e) => setSecondPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="registrationButton">
          Зарегистрироваться
        </button>
      </form>
    </main>
  );
}

export default Login;
