import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
            </Toolbar>
        </AppBar>
    );
};

export default Header;