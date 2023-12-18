import React, { useState, useEffect } from 'react';
import { fetchAllBooks } from '../../services/bookService';
import BookCard from '../BookCard/BookCard';
import PaginationComponent from '../Pagination/PaginationComponent';
import { Grid } from '@mui/material';
import {Book} from "../../types/Book";

const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const loadBooks = async () => {
            const data = await fetchAllBooks(currentPage);
            setBooks(data.content);
            setTotalPages(data.totalPages);
        };

        loadBooks();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default BooksList;
