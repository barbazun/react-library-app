import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../features/bookSlice';

const store = configureStore({
    reducer: {
        book: bookReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;