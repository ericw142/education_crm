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

    const goToSecondNextPage = () => {
        if (page === totalPages) return;
        const secondNext = page + 2;
        setPage(secondNext);
    }

    const goToLastPage = () => {
        setPage(totalPages)
    }

    const paginationButtonCSS = "text-gray-700 rounded-full bg-gray-100 flex items-center justify-center h-[40px] w-[40px] mx-1 cursor-pointer hover:bg-gray-400 hover:text-white";

    return (
        <div className='absolute inset-x-0 bottom-0 h-16 sm:ml-64 grow border-t'>
            <div className='p-4 flex flex-row justify-between'>
                <button className='text-gray-700' onClick={goToPreviousPage}>Previous</button>
                <div className='flex flex-row'>
                    <div 
                        className={paginationButtonCSS}
                    >
                        {page}
                    </div>
                    {totalPages >= page + 1 && (
                        <div
                            onClick={goToNextPage}
                            className={paginationButtonCSS}
                        >
                            {page + 1}
                        </div>
                    )}
                    {totalPages >= page + 2 && (
                        <div
                            onClick={goToSecondNextPage}
                            className={paginationButtonCSS}
                        >
                            {page + 2}
                        </div>
                    )}
                    {totalPages >= page + 3 && (
                        <>
                            <div
                                className="font-bold text-gray-700 flex items-center justify-center h-[40px] w-[40px]" 
                            >
                                ...
                            </div>
                            <div
                                className={paginationButtonCSS}
                            >
                                {totalPages - 2}
                            </div>
                            <div
                                className={paginationButtonCSS}
                            >
                                {totalPages - 1}
                            </div>
                            <div
                                onClick={goToLastPage}
                                className={paginationButtonCSS}
                            >
                                {totalPages}
                            </div>
                        </>
                    )}
                </div>
                <button className='text-gray-700' onClick={goToNextPage}>Next</button>
            </div>
        </div>
    )
}

export default Pagination