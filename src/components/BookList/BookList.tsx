import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, IconButton, Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookCard from '../BookCard/BookCard';
import PaginationComponent from '../Pagination/PaginationComponent';
import { Book } from "../../types/Book";
import { useNavigate } from 'react-router-dom';
import {fetchAllBooks} from "../../services/bookService";

const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const navigate = useNavigate();
    const deleteBookUrl = 'http://localhost:10055/api/v1/books/';

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const response = await fetchAllBooks();
                setBooks(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error('Сталася невідома помилка:', error);
            }
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
                const updatedBooks = books.filter(book => book.id !== selectedBookId);
                setBooks(updatedBooks);
            } catch (error) {
                console.error('Не вдалося видалити книгу:', error);
            }

            setOpenDialog(false);
            setSelectedBookId(null);
        }
    };

    const handleEditBook = (bookId: number) => {
        navigate(`/edit-book/${bookId}`);
    }

    return (
        <div>
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <BookCard book={book} />
                        <IconButton onClick={() => handleOpenDeleteDialog(book.id)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEditBook(book.id)}>
                            <EditIcon />
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
