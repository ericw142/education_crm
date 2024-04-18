import React from 'react'

const Pagination = ({ page, setPage, totalPages}) => {
    const goToPreviousPage = () => {
        if (page === 1) return;
        const prev = page - 1;
        setPage(prev);
    }

    const goToNextPage = () => {
        if (page === totalPages) return;
        const next = page + 1;
        setPage(next);
    }

    const goToFirstPage = () => {
        setPage(1)
    }

    const goToLastPage = () => {
        setPage(totalPages)
    }

    return (
        <div className='p-4 flex flex-row justify-center'>
            <button className='pagination-button' onClick={goToFirstPage}><span>&#171;</span></button>
            <button className='pagination-button' onClick={goToPreviousPage}><span>&#8249;</span></button>
            <p className='font-bold mt-2 mx-4'>{page} of {totalPages}</p>
            <button className='pagination-button' onClick={goToNextPage}><span>&#8250;</span></button>
            <button className='pagination-button' onClick={goToLastPage}><span>&#187;</span></button>
        </div>
    )
}

export default Pagination