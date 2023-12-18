import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookById } from '../../services/bookService';
import { Book } from "../../types/Book";
import defaultImage from '../../images/book_cover_mockup/mock.jpg'
import { Card, CardContent, Typography, CircularProgress, Box, Rating, CardMedia } from '@mui/material';

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const loadBook = async () => {
            if (id !== undefined) {
                try {
                    const bookId = parseInt(id, 10);
                    if (!isNaN(bookId)) {
                        const fetchedBook = await fetchBookById(bookId);
                        setBook(fetchedBook);
                        setImageSrc(fetchedBook.cover || defaultImage);
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error('Сталася невідома помилка:', error);
                    setIsLoading(false);
                }
            }
        };

        loadBook();
    }, [id]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!book) return <Typography>Книга не знайдена.</Typography>;

    const handleImageError = () => {
        setImageSrc(defaultImage);
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image={imageSrc}
                alt={book.title}
                onError={handleImageError}
                sx={{
                    width: 'auto',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    margin: 1
                }}
            />
            <CardContent>
                <Typography variant="h5">{book.title}</Typography>
                <Typography color="textSecondary">Автор: {book.author}</Typography>
                <Typography color="textSecondary">Жанри: {book.genres}</Typography>
                <Typography color="textSecondary">Опис: {book.description}</Typography>
                <Box>
                    <Typography component="legend">Рейтинг:</Typography>
                    <Rating name="read-only" value={book.rating} readOnly />
                </Box>
            </CardContent>
        </Card>
    );
};

export default BookDetails;
