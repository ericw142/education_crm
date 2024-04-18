/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

// student : {
//     firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;
//     currentlyEnrolled: boolean;
//     currentlyEnrolledCourseName: string;
// }
const StudentRow = ({ index, student, onOpenModal, setStudentEditorData }) => {
    return (
        <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {`${index+1} -  ${student.firstName} ${student.lastName}`}
            </th>
            <td className="px-6 py-4">
                {student.phone}
            </td>
            <td className="px-6 py-4">
                {student.email}
            </td>
            <td className='px-6 py-4'>
                {student.enrollmentStatus}
            </td>
            <td className="px-6 py-4">
                {student.currentlyEnrolledCourseName}
            </td>
            <td className="px-6 py-4">
                <a
                    onClick={() => {
                        onOpenModal()
                        setStudentEditorData(student)
                    }}
                    className="font-medium text-blue-400 hover:underline cursor-pointer"
                >Edit</a>
            </td>
        </tr>
    )
}

export default StudentRow