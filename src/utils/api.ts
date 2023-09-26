// api/axiosWrapper.js
import axios from "axios";
import { apiBaseUrl } from "environment";
import { hideProgress, showProgress } from "state/slices/progressSlice";
import { store } from "state/store";

const axiosRequest = axios.create({
    baseURL: apiBaseUrl,
});

axiosRequest.interceptors.request.use((config) => {
    // Dispatch action to show loader
    store.dispatch(showProgress());
    return config;
});

axiosRequest.interceptors.response.use(
    (response) => {
        // Dispatch action to hide loader on successful response
        store.dispatch(hideProgress());
        return response;
    },
    (error) => {
        // Dispatch action to hide loader on error
        store.dispatch(hideProgress());
        return Promise.reject(error);
    }
);

export default axiosRequest;
