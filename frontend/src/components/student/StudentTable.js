import React from 'react'
import StudentRow from './StudentRow'

const StudentTable = ({ students }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        <th scope="col" className="px-6 py-3">
                            Currently Enrolled Course
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {students?.length > 0 && (
                        <>
                            {students.map((student, i) => {
                                return (
                                    <StudentRow
                                        key={`student-row-${student.lastName}-${i}`}
                                        index={i}
                                        student={student}
                                    />
                                )
                            })}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default StudentTable