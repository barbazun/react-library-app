import React from 'react';
import Pagination from '@mui/material/Pagination';

interface PaginationComponentProps {
    totalPages: number;
    currentPage: number;
    onChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ totalPages, currentPage, onChange }) => {
    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => onChange(page)}
        />
    );
};

export default PaginationComponent;
