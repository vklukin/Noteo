import axios from "axios";
import { toast } from "react-toastify";

export const PostCreateNoteQuery = async (heading, textarea) => {
  await axios
    .post("http://localhost:2000/api/post", {
      title: heading,
      text: textarea,
    })
    .then(function (response) {
      return toast.success("Заметка добавлена!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    })
    .catch(function (error) {
      console.log(error);
      return toast.error("Произошла ошибка! Повторите попытку позже.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    });
};
