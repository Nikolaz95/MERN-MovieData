import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

//import css
import "./PaginationComponent.css"

const PaginationComponent = ({ totalPages, currentPage, handleChange }) => {
    return (
        <div className="pagination">
            <Stack spacing={2}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChange}
                    color="primary"
                />
            </Stack>
        </div>
    )
}

export default PaginationComponent