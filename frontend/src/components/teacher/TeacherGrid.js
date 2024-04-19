import React, { useEffect, useState } from 'react'
import TeacherCard from './TeacherCard'
import Pagination from '../Pagination'

const TeacherGrid = ({ teachers }) => {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        if (teachers?.length > 0) {
            const total = Math.ceil(teachers.length / 9);
            setTotalPages(total)
        } else {
            setTotalPages(1)
        }
    }, [teachers?.length])

    return (
        <div>
            <div className='flex flex-row justify-between pb-5'>
                <div>
                    <h1 className='text-start text-2xl font-bold'>Teachers ({teachers?.length})</h1>
                    <h6 className='text-start text-md text-gray-500'>All of the teachers are listed here</h6>
                </div>
                <button className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 h-[40px]">+ Add New Teacher</button>
            </div>
            <div className='w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5'>
                {teachers.map((teacher, i) => {
                    return <TeacherCard key={`teacher-card-${i}`} teacher={teacher}/>
                })}
            </div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
        </div>
    )
}

export default TeacherGrid