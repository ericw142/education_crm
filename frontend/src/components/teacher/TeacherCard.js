import React from 'react'
import formatDate from '../../utils/formatDate'

const TeacherCard = ({ teacher }) => {
    const convertHireDate = (hireDate) => {
        let date = new Date(hireDate);
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let dd = String(date.getDate()).padStart(2, '0');
        let yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }
    return (
        <div className='p-[30px] w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl'>
            <div className='pr-4'>
                <div className='py-2'>
                    <p className='font-semibold'>{teacher?.firstName} {teacher?.lastName}</p>
                    <p className='text-gray-500 text-sm'>{teacher?.role || 'Unassigned'}</p>
                </div>
                <div className='text-sm'>
                    <p>
                        <span className='font-semibold'>Employee Code: </span>
                        {teacher?.firstName[0].toLowerCase()}{teacher?.lastName.toLowerCase()}{teacher?._id.substring(0, 3)}
                    </p>
                    {teacher?.hireDate && <p><span className='font-semibold'>Hire Date:</span> {formatDate(convertHireDate(teacher?.hireDate), true)}</p>}
                </div>
            </div>
        </div>
    )
}

export default TeacherCard