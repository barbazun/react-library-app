// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import BookDetails from './components/BookDetails/BookDetails';
import reportWebVitals from "./reportWebVitals";
import AddBookForm from "./components/AddBookForm/AddBookForm";

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/books/add" element={<AddBookForm />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
