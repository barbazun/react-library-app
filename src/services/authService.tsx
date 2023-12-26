import axios from "axios";

const AUTH_URL = 'http://localhost:10055/api/v1/login';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${AUTH_URL}, {username, password}`);
        return response.data;
    } catch (error) {
        console.error("Помилка авторизації: ", error);
        throw error;
    }

}

