import axios from "axios";
import {toast} from "react-toastify";

export const PostRemoveNoteQuery = async (id, cardItem) => {
    await axios.post('http://localhost:2000/api/remove-note', {
        id: id
    }).then(function () {
        toast.success('Заметка удалена!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        return cardItem.remove();
    }).catch(function (error) {
        console.error(error)
        toast.error('Произошла ошибка! Повторите попытку позже.', {
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
}