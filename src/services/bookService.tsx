import axiosInstance from '../utils/axiosInstance';

const BASE_URL = '/v1/books';
const DEFAULT_PAGE_SIZE = 10;

interface CreateBookData {
    title: string;
    author: string;
    genres: string;
    description: string;
    rating: number;
    cover: string;
}

interface UpdateBookData {
    title: string;
    author: string;
    genres: string;
    description: string;
}

export const fetchAllBooks = async (page: number = 1, pageSize: number = DEFAULT_PAGE_SIZE) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}?page=${page - 1}&size=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Сталася невідома помилка:', error);
        throw error;
    }
};

export const fetchBookById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Сталася невідома помилка:', error);
        throw error;
    }
};

export const addNewBook = async (bookData : CreateBookData) => {
    try {
        const response = await axiosInstance.post('/books', bookData);
        return response.data;
    } catch (error) {
        console.error('Помилка при додаванні книги:', error);
        throw error;
    }
};

export const updateBook = async (bookData : UpdateBookData, bookId : string | undefined) => {
    try {
        const response = await axiosInstance.put(`/books/${bookId}`, bookData);
        return response.data;
    } catch (error) {
        console.error('Помилка при оновленні книги:', error);
        throw error;
    }
}
