import React, { useState } from 'react';
import {Card, CardContent, Typography, CardActions, Button, Grid, CardMedia, Box, Rating} from '@mui/material';
import defaultImage from '../../images/book_cover_mockup/mock.jpg'
import { Link } from 'react-router-dom';
import { Book } from '../../types/Book';

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    const [imageSrc, setImageSrc] = useState(book.cover || defaultImage);

    const handleImageError = () => {
        if (imageSrc !== defaultImage) {
            setImageSrc(defaultImage);
        }
    };

    return (
        <Card>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CardMedia
                        component="img"
                        image={imageSrc}
                        alt={book.title}
                        onError={handleImageError}
                        sx={{
                            height: 'auto',
                            maxWidth: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {book.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {book.description}
                        </Typography>
                        <Box>
                            <Typography component="legend">Рейтинг:</Typography>
                            <Rating name="read-only" value={book.rating} readOnly />
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={`/books/${book.id}`}>
                            Детально
                        </Button>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    );
};

export default BookCard;
