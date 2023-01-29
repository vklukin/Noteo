import React, { useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Noteo - Вход";
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="loginPage">
      <form onSubmit={handleFormSubmit}>
        <h1>Вход</h1>
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
              value={password}
              id="password"
              className="input input-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="controllers">
          <a href="/registration">Создать аккаунт</a>
          <button type="submit">Войти</button>
        </div>
      </form>
    </main>
  );
}

export default Login;
