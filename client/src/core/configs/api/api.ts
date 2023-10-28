import axios, { AxiosInstance } from "axios";

import { API_URL } from "../../constants/api";

export const Api: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" }
});
