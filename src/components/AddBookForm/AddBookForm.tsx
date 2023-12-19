import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl, CircularProgress, OutlinedInput, Chip } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import {Link} from "react-router-dom";

interface BookData {
    title: string;
    author: string;
    genres: string[];
    description: string;
    rating: number;
    cover: string;
}

const AddBookForm: React.FC = () => {
    const [bookData, setBookData] = useState<BookData>({
        title: '',
        author: '',
        genres: [],
        description: '',
        rating: 0,
        cover: ''
    });
    const [availableGenres, setAvailableGenres] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const genresUrl = 'http://localhost:10055/api/v1/books/genres';
    const addBookUrl = 'http://localhost:10055/api/v1/books';

    useEffect(() => {
        axios.get(genresUrl)
            .then(response => {
                setAvailableGenres(response.data);
            })
            .catch(error => console.error('Помилка при отриманні жанрів:', error));
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBookData({ ...bookData, [event.target.name]: event.target.value });
    };

    const handleSelectChange = (event: SelectChangeEvent<typeof bookData.genres>) => {
        setBookData({ ...bookData, genres: event.target.value as string[] });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);

        const submitData = {
            ...bookData,
            genres: bookData.genres.join(',')
        };

        axios.post(addBookUrl, submitData)
            .then(() => {
                alert('Книга була успішно додана!');
                setBookData({
                    title: '',
                    author: '',
                    genres: [],
                    description: '',
                    rating: 0,
                    cover: ''
                });
            })
            .catch(error => {
                console.error('Помилка при додаванні книги:', error);
                alert('Помилка при додаванні книги.');
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3} sx={{ maxWidth: 500, margin: 'auto' }}>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Назва"
                        name="title"
                        fullWidth
                        value={bookData.title}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Автор"
                        name="author"
                        fullWidth
                        value={bookData.author}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="genres-label">Жанри</InputLabel>
                        <Select
                            labelId="genres-label"
                            multiple
                            value={bookData.genres}
                            onChange={handleSelectChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Жанри" />}
                            renderValue={(selected) => (
                                <div>
                                    {selected.map(value => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </div>
                            )}
                            name="genres"
                        >
                            {availableGenres.map(genre => (
                                <MenuItem key={genre} value={genre}>
                                    {genre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Опис"
                        name="description"
                        multiline
                        rows={4}
                        fullWidth
                        value={bookData.description}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Рейтинг"
                        name="rating"
                        multiline
                        rows={4}
                        fullWidth
                        value={bookData.rating}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Посилання на обкладинку"
                        name="cover"
                        multiline
                        rows={4}
                        fullWidth
                        value={bookData.cover}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth disabled={submitting}>
                        {submitting ? <CircularProgress size={24} /> : 'Додати книгу'}
                    </Button>
                    <Button variant="outlined" fullWidth component={Link} to="/">
                        На головну
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddBookForm;
