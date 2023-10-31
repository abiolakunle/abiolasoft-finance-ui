// api/axiosWrapper.js
import axios, { AxiosInstance } from "axios";
import { apiBaseUrl } from "environment";
import { showProgress } from "state/slices/progressSlice";
import { store } from "state/store";

let value: AxiosInstance = undefined;

const axiosRequest = (): AxiosInstance => {
    if (!!value) return value;

    value = axios.create({
        baseURL: apiBaseUrl,
    });

    value.interceptors.request.use((config) => {
        store.dispatch(showProgress());
        return config;
    });

    return value;
};

export default axiosRequest();
