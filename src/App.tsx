import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/AppBar/Header';
import BooksList from "./components/BookList/BookList";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <div>
                <Header />
                <BooksList />
            </div>
        </AuthProvider>
    );
};

export default App;
