import React, { useEffect, useState } from "react";
import { PostCreateNoteQuery } from "../controllers/AxiosQueriesForNotes/PostCreateNoteQuery";
import { toast } from "react-toastify";

import HistoryBackButton from "./../components/HistoryBackButton";

const CreateNote = () => {
  useEffect(() => {
    document.title = "Создание заметки";
  }, []);

  const [heading, setHeading] = useState("");
  const [textarea, setTextarea] = useState("");

  function clearForm() {
    setHeading("");
    setTextarea("");
  }

  function validate(e) {
    e.preventDefault();

    let inputHeading = document.querySelector(".input-heading");
    let inputTextarea = document.querySelector(".input-textarea");

    if (
      inputHeading.value.trim().length === 0 &&
      inputTextarea.value.trim().length === 0
    ) {
      inputTextarea.classList.add("error-input");
      inputHeading.classList.add("error-input");

      return toast.error("Заполните поля!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
      PostCreateNoteQuery(heading, textarea).then(clearForm);
    }
  }

  return (
    <main className="create">
      <HistoryBackButton />
      <form action="#" method="post" onSubmit={validate}>
        <div className="input-wrapper grid-input-heading">
          <label htmlFor="heading" className="labelRed">
            Заголовок
          </label>
          <input
            type="text"
            placeholder="Введите заголовок"
            value={heading}
            id="heading"
            className="input input-heading"
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="input-wrapper grid-input-textarea">
          <label htmlFor="textarea" className="labelRed">
            Текст
          </label>
          <textarea
            placeholder="Введите текст"
            value={textarea}
            id="textarea"
            className="input input-textarea"
            onChange={(e) => setTextarea(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">Создать</button>
      </form>
    </main>
  );
};

export default CreateNote;
