import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const GetNoteForEdit = () => {
    const [note, setNote] = useState([]);
    const { id } = useParams();

    const loadNote = async () => {
        const response = await axios.get(`http://localhost:2000/api/get/${id}`);
        setNote(response.data);
    };
    useEffect(() => {
        loadNote();
    }, [id]);

    return note;
};
