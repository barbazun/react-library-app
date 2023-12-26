import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, Select, MenuItem, InputLabel, OutlinedInput, Chip, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import {updateBook} from "../../services/bookService";

const EditBookForm = () => {
    interface BookData {
        title: string;
        author: string;
        description: string;
        genres: string[];
    }

    const [bookData, setBookData] = useState<BookData>({
        title: '',
        author: '',
        description: '',
        genres: []
    });
    const [availableGenres, setAvailableGenres] = useState<string[]>([]);
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:10055/api/v1/books/${bookId}`)
            .then(response => {
                setBookData({
                    title: response.data.title,
                    author: response.data.author,
                    description: response.data.description,
                    genres: response.data.genres.split(',').map((genre: string) => genre.trim())
                });
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });

        axios.get('http://localhost:10055/api/v1/genres')
            .then(response => {
                setAvailableGenres(response.data);
            })
            .catch(error => {
                console.error('Error fetching genres:', error);
            });
    }, [bookId]);

    const handleSave = () => {
        if (!bookData.title || !bookData.author || !bookData.description) {
            alert('Please fill in all fields.');
            return;
        }

        updateBook({
            ...bookData,
            genres: bookData.genres.join(',')
        }, bookId)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error updating book:', error);
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBookData({ ...bookData, [event.target.name]: event.target.value });
    };

    const handleGenreChange = (event: SelectChangeEvent<string[]>) => {
        setBookData({ ...bookData, genres: event.target.value as string[] });
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Title"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Author"
                    name="author"
                    value={bookData.author}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={bookData.description}
                    onChange={handleChange}
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="genres-label">Genres</InputLabel>
                <Select
                    labelId="genres-label"
                    name="genres"
                    multiple
                    value={bookData.genres}
                    onChange={handleGenreChange}
                    input={<OutlinedInput label="Genres" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    {availableGenres.map((genre) => (
                        <MenuItem key={genre} value={genre}>
                            {genre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                sx={{ mt: 2, py: 1, px: 3 }}
            >
                Save
            </Button>
        </Box>
    );
};

export default EditBookForm;
