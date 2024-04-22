import React, { useState } from 'react'
import NewCourseForm from './editor/NewCourseForm'
import EditCourseForm from './editor/EditCourseForm'

const CoursePlanner = ({ courses, teachers, fetchCourseInfo }) => {
    const [selectedForm, setSelectedForm] = useState('')

    const backButton = () => {
        return (
            <button
                onClick={() => setSelectedForm('')}
                className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-1.5 h-[40px] w-[200px] mb-5"
            >
                Back
            </button>
        )
    }

    return (
        <div className='px-4 pt-5'>
            <h1 className='text-center text-2xl font-bold'>Course Planner</h1>
            {selectedForm === 'New Course' ? (
                <div>
                    {backButton()}
                    <NewCourseForm teachers={teachers} fetchCourseInfo={fetchCourseInfo}/>
                </div>
            ) : selectedForm === 'Edit Course' ? (
                <div>
                    {backButton()}
                    <EditCourseForm courses={courses} teachers={teachers} fetchCourseInfo={fetchCourseInfo} />
                </div>
            ) : (
                <div className='container flex flex-col gap-4 p-10 px-[40px]'>
                    <button
                        onClick={() => setSelectedForm('Edit Course')}
                        className="bg-white border border-blue-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 h-[40px] w-[400px] text-[18px] mx-auto"
                    >
                        Edit Existing Course
                    </button>
                    <button
                        onClick={() => setSelectedForm('New Course')}
                        className="bg-white border border-green-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-1.5 h-[40px] w-[400px] text-[18px] mx-auto"
                    >
                        Create New Course
                    </button>
                </div>
            )}
        </div>
    )
}

export default CoursePlanner