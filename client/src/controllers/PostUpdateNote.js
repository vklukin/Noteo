import axios from "axios";
import {toast} from "react-toastify";

export const PostUpdateNote = async (heading, textarea, id) => {
    await axios.post('http://localhost:2000/api/update-note', {
        title: heading,
        text: textarea,
        id: id
    }).then(function (response) {
        return toast.success('Заметка изменена!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        })
    }).catch(function (error) {
        console.log(error)
        return toast.error('Произошла ошибка! Повторите попытку позже.', {
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