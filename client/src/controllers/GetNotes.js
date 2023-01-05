import {useEffect, useState} from "react";
import axios from "axios";

export const GetNote = function () {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:2000/api/get');
        setData(response.data)
    }
    useEffect(() => {
        loadData();
    }, []);

    return data
}