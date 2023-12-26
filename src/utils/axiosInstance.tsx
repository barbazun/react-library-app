import axios from 'axios';
import { getSessionToken } from './authUtils';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:10055/api/v1',
});

axiosInstance.interceptors.request.use((config) => {
    const token = getSessionToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
