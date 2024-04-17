import React, { useState } from 'react'
import StudentTable from './StudentTable'
import NewStudentModal from './NewStudentModal'

const StudentPipeline = ({ students, fetchInfo }) => {
    const [currentStatusView, setCurrentStatusView] = useState('New Lead')
    const [openNewStudentModal, setOpenNewStudentModal] = useState(false)

    const onOpenModal = () => setOpenNewStudentModal(true);
    const onCloseModal = () => setOpenNewStudentModal(false);

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
                        <option value="Current Student">Current Students</option>
                        <option value="Graduated">Graduated</option>
                    </select>
                </div>
                <div className='grid-cols-1'>
                    <button
                        onClick={onOpenModal}
                        className="text-gray-700 border-gray-700 border-2 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Enter new Student info
                    </button>
                </div>
            </div>
            <div className='mt-5'>
               <StudentTable students={students} fetchInfo={fetchInfo} enrollmentStatus={currentStatusView} />
            </div>
        </div>
    )
}

export default StudentPipeline