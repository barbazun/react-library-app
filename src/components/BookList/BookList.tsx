import React, { useState, useEffect } from 'react';
import { fetchAllBooks } from '../../services/bookService';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import PaginationComponent from '../Pagination/PaginationComponent';
import { Grid, IconButton, Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Book } from "../../types/Book";

const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const deleteBookUrl = 'http://localhost:10055/api/v1/books/'

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

    const handleOpenDeleteDialog = (bookId: number) => {
        setSelectedBookId(bookId);
        setOpenDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = async () => {
        if (selectedBookId !== null) {
            try {
                await axios.delete(`${deleteBookUrl}${selectedBookId}`);
                const data = await fetchAllBooks(currentPage);
                setBooks(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Помилка при видаленні книги:', error);
            }

            setOpenDialog(false);
            setSelectedBookId(null);
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <BookCard book={book} />
                        <IconButton onClick={() => handleOpenDeleteDialog(book.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={handlePageChange}
            />
            <Dialog open={openDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Видалити книгу?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Відмінити</Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Підтвердити
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BooksList;
