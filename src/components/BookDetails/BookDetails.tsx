import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchBookDetails } from '../../features/bookSlice';
import { CircularProgress, Box, Typography, Card, CardContent, CardMedia, Grid, Button, Rating } from '@mui/material';
import defaultImage from '../../images/book_cover_mockup/mock.jpg';
import {RootState} from "../../app/store";

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const dispatch = useDispatch();
    const { currentBook, isLoading, error } = useSelector((state: RootState) => state.book);
    const [imageSrc, setImageSrc] = useState(defaultImage);

    useEffect(() => {
        if (id) {
            const bookId = parseInt(id, 10);
            if (!isNaN(bookId)) {
                // @ts-ignore
                dispatch(fetchBookDetails(bookId));
            } else {
                console.error('Invalid book ID');
            }
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (currentBook && currentBook.cover) {
            setImageSrc(currentBook.cover);
        }
    }, [currentBook]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">Сталася невідома помилка: {error}</Typography>;
    }

    if (!currentBook) return <Typography>Книга не знайдена.</Typography>;

    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image={imageSrc}
                alt={currentBook.title}
                onError={() => setImageSrc(defaultImage)}
                sx={{
                    width: 'auto',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    margin: 1
                }}
            />
            <CardContent>
                <Typography variant="h5">{currentBook.title}</Typography>
                <Typography color="textSecondary">Автор: {currentBook.author}</Typography>
                <Typography color="textSecondary">Жанри: {currentBook.genres}</Typography>
                <Typography color="textSecondary">Опис: {currentBook.description}</Typography>
                <Box>
                    <Typography component="legend">Рейтинг:</Typography>
                    <Rating name="read-only" value={currentBook.rating} readOnly />
                </Box>
            </CardContent>
            <Grid container justifyContent="center">
                <Button variant="outlined" component={Link} to="/">
                    На головну
                </Button>
            </Grid>
        </Card>
    );
};

export default BookDetails;
