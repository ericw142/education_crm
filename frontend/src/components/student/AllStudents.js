import React, { useState, useEffect } from 'react'
import StudentTable from './StudentTable'
import Pagination from '../Pagination'

const AllStudents = ({ students, fetchInfo }) => {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        if (students?.length > 0) {
            const total = Math.ceil(students.length / 10);
            setTotalPages(total)
        } else {
            setTotalPages(1)
        }
    }, [students?.length, students])

    return (
        <div>
            <StudentTable students={students} fetchInfo={fetchInfo} />
            <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
        </div>
    )
}

export default AllStudents