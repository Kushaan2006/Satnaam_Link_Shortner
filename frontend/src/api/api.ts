import axios from "axios";
import { setReactAccessToken } from "../context/setReactComponents";
import { useNavigate } from "react-router-dom";

let accessToken: string | null = null;

export function setApiAccessToken(token: string | null) {
    accessToken = token;
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})


api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/refresh")
        ) {
            originalRequest._retry = true;
            try {
                console.log("No Token Found, Refreshing")
                const response = await api.post("/auth/refresh");
                const newAccessToken = response.data.accessToken;

                setApiAccessToken(newAccessToken);
                setReactAccessToken(newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (error) {
                setApiAccessToken(null);
                setReactAccessToken(null);
                window.location.href = "/";
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }


);