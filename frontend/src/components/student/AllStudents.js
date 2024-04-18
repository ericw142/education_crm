import React, { useState, useEffect } from 'react'
import StudentTable from './StudentTable'
import Pagination from '../Pagination'

const AllStudents = ({ students, fetchInfo }) => {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [paginatedStudents, setPaginatedStudents] = useState([])
    const itemsPerPage = 10;

    useEffect(() => {
        if (students?.length > 0) {
            const total = Math.ceil(students.length / itemsPerPage);
            setTotalPages(total)
        } else {
            setTotalPages(1)
        }
    }, [students?.length, students])

    useEffect(() => {
        if (students?.length > 0) {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginated = students.slice(startIndex, endIndex);
            setPaginatedStudents(paginated)
        }
    }, [page, students])

    return (
        <div>
            <StudentTable students={paginatedStudents} fetchInfo={fetchInfo} />
            <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
        </div>
    )
}

export default AllStudents