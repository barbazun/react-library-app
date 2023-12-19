import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Онлайн каталог книг
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SearchIcon />
                    <InputBase
                        placeholder="Пошук книг…"
                        inputProps={{ 'aria-label': 'search' }}
                        sx={{ ml: 1 }}
                    />
                </Box>
                <Button color="inherit" component={Link} to="/books/add">
                    Додати книгу
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
