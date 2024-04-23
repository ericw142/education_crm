import React, { useState, useEffect } from 'react'
import StudentTable from './StudentTable'
import NewStudentModal from './NewStudentModal'
import Pagination from '../Pagination'

const StudentPipeline = ({ students, fetchInfo }) => {
    const [currentStatusView, setCurrentStatusView] = useState('New Lead')
    const [openNewStudentModal, setOpenNewStudentModal] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredStudents, setFilteredStudents] = useState()
    const [paginatedStudents, setPaginatedStudents] = useState([])
    const itemsPerPage = 10;

    const onOpenModal = () => setOpenNewStudentModal(true);
    const onCloseModal = () => setOpenNewStudentModal(false);

    useEffect(() => {
        const filtered = students?.length > 0 ? students.filter((student) => student?.enrollmentStatus === currentStatusView) : [];
        setFilteredStudents(filtered)
        if (filtered.length > 0) {
            const total = Math.ceil(filtered.length / itemsPerPage);
            setTotalPages(total)
        } else {
            setTotalPages(1)
        }
    }, [students?.length, currentStatusView, students])

    useEffect(() => {
        if (filteredStudents?.length > 0) {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginated = filteredStudents.slice(startIndex, endIndex);
            setPaginatedStudents(paginated)
        } else {
            setPaginatedStudents([])
        }
    }, [page, filteredStudents])

    return (
        <div>
            <NewStudentModal open={openNewStudentModal} onCloseModal={onCloseModal} fetchInfo={fetchInfo}/>
            <div className='flex flex-row justify-between'>
                <div className='grid-cols-1'>
                    <select
                        onChange={(e) => setCurrentStatusView(e.currentTarget.value)}
                        className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="New Lead">New Leads</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Interested">Interested</option>
                        <option value="Uninterested">Uninterested</option>
                        <option value="Application Started">Application Started</option>
                        <option value="Application Completed">Application Completed</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Graduated">Graduated</option>
                    </select>
                </div>
                <div className='grid-cols-1'>
                    <button
                        onClick={onOpenModal}
                        className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-1.5 h-[40px]"
                    >
                        + Add New Student
                    </button>
                </div>
            </div>
            <div className='mt-5'>
               <StudentTable students={paginatedStudents} fetchInfo={fetchInfo} />
            </div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
        </div>
    )
}

export default StudentPipeline