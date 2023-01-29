import axios from "axios";
import { toast } from "react-toastify";

export const DeleteNoteQuery = async (id, cardItem) => {
  await axios
    .delete("http://localhost:2000/api/remove-note", {
      data: {
        id: id,
      },
    })
    .then(function () {
      toast.success("Заметка удалена!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return (cardItem.style.display = "none");
    })
    .catch(function (error) {
      console.error(error);
      toast.error("Произошла ошибка! Повторите попытку позже.", {
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