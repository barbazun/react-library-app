import axios from 'axios';

const BASE_URL = 'http://localhost:10055/api/v1/books';
const DEFAULT_PAGE_SIZE = 10;

export const fetchAllBooks = async (page: number = 1, pageSize: number = DEFAULT_PAGE_SIZE) => {
    try {
        const response = await axios.get(`${BASE_URL}?page=${page - 1}&size=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Сталася невідома помилка:', error);
        throw error;
    }
};

export const fetchBookById = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Сталася невідома помилка:', error);
        throw error;
    }
};

