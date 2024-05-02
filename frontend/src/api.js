import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

api.interceptors.request.use(
    (config) => {

        // store the token in localstorage
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {

            // if there is a token, add it to the Authorization header which is allowing access to the protected routes
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api;