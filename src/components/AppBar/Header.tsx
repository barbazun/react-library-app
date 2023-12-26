import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useContext(AuthContext);

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
                {user ? (
                    <>
                        <Typography component="span" sx={{ mx: 2 }}>
                            Привіт, {user}
                        </Typography>
                        <Button color="inherit" onClick={logout}>
                            Вийти
                        </Button>
                    </>
                ) : (
                    <Button color="inherit" component={Link} to="/login">
                        Увійти
                    </Button>
                )}
                <Button color="inherit" component={Link} to="/books/add">
                    Додати книгу
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
