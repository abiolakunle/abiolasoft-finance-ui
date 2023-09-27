// api/axiosWrapper.js
import axios from "axios";
import { apiBaseUrl } from "environment";

import { showProgress } from "state/slices/progressSlice";
import { store } from "state/store";

const axiosRequest = axios.create({
    baseURL: apiBaseUrl,
});

axiosRequest.interceptors.request.use((config) => {
    store.dispatch(showProgress());
    return config;
});

export default axiosRequest;
