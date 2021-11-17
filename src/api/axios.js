import axios from "axios";
import * as Types from "./types";

axios.defaults.baseURL = "http://127.0.0.1:5005";

axios.interceptors.response.use((value) => {
    console.log(value);
    return value.data;
});
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem(Types.StorageTokenName);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axios;
