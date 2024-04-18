import React, { useState } from 'react'
import StudentRow from './StudentRow'
import StudentEditorModal from './StudentEditorModal';

const StudentTable = ({ students, fetchInfo, enrollmentStatus }) => {
    const [studentEditorData, setStudentEditorData] = useState()
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const filteredStudents = students?.length > 0 ? students.filter((student) => student?.enrollmentStatus === enrollmentStatus) : [];

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <StudentEditorModal open={open} onCloseModal={onCloseModal} student={studentEditorData} fetchInfo={fetchInfo}/>
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Student name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className='px-6 py-3'>
                            Enrollment Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Currently Enrolled In
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents?.length > 0 && (
                        <>
                            {filteredStudents.map((student, i) => {
                                    return (
                                        <StudentRow
                                            key={`student-row-${student.lastName}-${i}`}
                                            index={i}
                                            student={student}
                                            onOpenModal={onOpenModal}
                                            setStudentEditorData={setStudentEditorData}
                                        />
                                    )
                                }
                            )}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default StudentTable