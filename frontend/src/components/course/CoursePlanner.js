import React, { useState } from 'react'
import NewCourseForm from './editor/NewCourseForm'
import EditCourseForm from './editor/EditCourseForm'

const CoursePlanner = ({ courses, teachers, students, fetchCourseInfo }) => {
    const [selectedForm, setSelectedForm] = useState('')
    const [editedCourseData, setEditedCourseData] = useState({})

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
            <div>
                {selectedForm === 'New Course' ? (
                    <div>
                        {backButton()}
                        <NewCourseForm teachers={teachers} students={students} fetchCourseInfo={fetchCourseInfo}/>
                    </div>
                ) : (
                    <div>
                        <div className='flex flex-row justify-between'>
                            {editedCourseData?._id ? (
                                <button
                                    onClick={() => setEditedCourseData({})}
                                    className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-1.5 h-[40px] w-[200px] mb-5"
                                >
                                    Back
                                </button>
                            ) : (
                                <button
                                    onClick={() => setSelectedForm('New Course')}
                                    className="bg-green border border-green-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-1.5 h-[40px] w-[200px] mb-5 ml-auto text-green-600"
                                >
                                    New Course
                                </button>
                            )}
                        </div>
                        <EditCourseForm
                            courses={courses}
                            teachers={teachers}
                            students={students}
                            fetchCourseInfo={fetchCourseInfo}
                            editedCourseData={editedCourseData}
                            setEditedCourseData={setEditedCourseData}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CoursePlanner