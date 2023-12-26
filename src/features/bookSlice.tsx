import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {Book} from "../types/Book";
import {fetchBookById} from "../services/bookService";

interface BookState {
    currentBook: Book | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: BookState = {
    currentBook: null,
    isLoading: false,
    error: null,
};

export const fetchBookDetails = createAsyncThunk<Book, number, { rejectValue: string }>(
    'book/fetchBookDetails',
    async (bookId, thunkAPI) => {
        try {
            const response = await fetchBookById(bookId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBookDetails.fulfilled, (state, action: PayloadAction<Book>) => {
                state.isLoading = false;
                state.currentBook = action.payload;
                state.error = null;
            })
            .addCase(fetchBookDetails.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload || 'An error occurred';
            });
    },
});

export default bookSlice.reducer;
