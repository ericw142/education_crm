/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

// student : {
//     firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;
//     currentlyEnrolled: boolean;
//     currentlyEnrolledCourse: string;
// }
const StudentRow = ({ index, student, onOpenModal, setStudentEditorData }) => {
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {`${index+1} -  ${student.firstName} ${student.lastName}`}
            </th>
            <td className="px-6 py-4">
                {student.phone}
            </td>
            <td className="px-6 py-4">
                {student.email}
            </td>
            <td className="px-6 py-4">
                {student.currentlyEnrolledCourse}
            </td>
            <td className="px-6 py-4">
                <a
                    onClick={() => {
                        onOpenModal()
                        setStudentEditorData(student)
                    }}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                >Edit</a>
            </td>
        </tr>
    )
}

export default StudentRow