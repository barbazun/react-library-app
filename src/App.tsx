import React from 'react';
import Header from './components/AppBar/Header';
import BooksList from "./components/BookList/BookList";

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <BooksList />
        </div>
    );
};

export default App;

