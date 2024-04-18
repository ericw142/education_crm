import React from 'react'
import TeacherCard from './TeacherCard'

const TeacherGrid = ({ teachers }) => {
    return (
        <div className='p-4 sm:ml-64 grow'>
            <div className='flex flex-row justify-between pb-5'>
                <div>
                    <h1 className='text-start text-2xl font-bold'>Teachers ({teachers?.length})</h1>
                    <h6 className='text-start text-md text-gray-500'>All of the teachers are listed here</h6>
                </div>
                <button>+ Add New Teacher</button>
            </div>
            <div className='w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5'>
                {teachers.map((teacher, i) => {
                    return <TeacherCard key={`teacher-card-${i}`} teacher={teacher}/>
                })}
            </div>
        </div>
    )
}

export default TeacherGrid