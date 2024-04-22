import React, { useState } from 'react'
import axios from 'axios'

const EditCourseForm = ({ courses, teachers, fetchCourseInfo }) => {
    const [editedCourseData, setEditedCourseData] = useState({})

    const patchCourse = async () => {
        if (!editedCourseData || !editedCourseData?._id) {
            return;
        }

        await axios.patch('http://localhost:3500/courses', editedCourseData)
            .then(() => {
                console.log('Updated course')
                setEditedCourseData({})
                fetchCourseInfo()
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className='flex flex-row gap-2'>
            <div className='w-[400px]'>
                {courses?.map((course, i) => {
                    if (course) {
                        return (
                            <div
                                key={`${course.title}-courseselect-${i}`}
                                onClick={() => setEditedCourseData({...course})}
                                className='border-2 cursor-pointer text-center py-2 rounded'
                            >
                                <p>{course.title}</p>
                            </div>
                        )
                    }
                    return <></>
                })}
            </div>
            {editedCourseData?._id && (
                <div className='container'>
                    <form>
                        <div className="mb-5 flex flex-row gap-2">
                            <div className='container'>
                                <label htmlFor='title' className="block mb-2 text-sm font-medium">Title</label>
                                <input
                                    required
                                    type="text"
                                    id='title'
                                    value={editedCourseData?.title}
                                    onChange={(e) => {
                                        setEditedCourseData({ ...editedCourseData, title: e.currentTarget.value });
                                    }}
                                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>
                            <div className='container'>
                                <label htmlFor='teacher' className="block mb-2 text-sm font-medium">Teacher</label>
                                <select
                                    value={editedCourseData?.teacherId}
                                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                                    onChange={(e) => {
                                        setEditedCourseData({ ...editedCourseData, teacherId: e.currentTarget.value })
                                    }}
                                >
                                    <option value=""></option>
                                    {teachers?.map((teacher, i) => {
                                        return <option value={teacher?._id}>{teacher?.firstName} {teacher?.lastName}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor='description' className="block mb-2 text-sm font-medium">Description</label>
                            <input
                                required
                                type="text"
                                id='description'
                                value={editedCourseData?.description}
                                onChange={(e) => {
                                    setEditedCourseData({ ...editedCourseData, description: e.currentTarget.value });
                                }}
                                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div className="mb-5 flex flex-row gap-2">
                            <div className='container'>
                                <label htmlFor='startDate' className="block mb-2 text-sm font-medium">Start Date</label>
                                <input
                                    required
                                    type="date"
                                    id='startDate'
                                    value={editedCourseData?.startDate}
                                    onChange={(e) => {
                                        setEditedCourseData({ ...editedCourseData, startDate: e.currentTarget.value });
                                    }}
                                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>
                            <div className='container'>
                                <label htmlFor='endDate' className="block mb-2 text-sm font-medium">End Date</label>
                                <input
                                    required
                                    type="date"
                                    id='endDate'
                                    value={editedCourseData?.endDate}
                                    onChange={(e) => {
                                        setEditedCourseData({ ...editedCourseData, endDate: e.currentTarget.value });
                                    }}
                                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>
                        </div>
                        <div className='mb-5 flex flex-row gap-2'>
                            <div className='container'>
                                <label htmlFor='certificationLevel' className='block mb-2 text-sm font-medium'>JLPT Level</label>
                                <select
                                    value={editedCourseData?.certificationLevel}
                                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                                    onChange={(e) => {
                                        setEditedCourseData({ ...editedCourseData, certificationLevel: e.currentTarget.value })
                                    }}
                                >
                                    <option value="N5">N5</option>
                                    <option value="N4">N4</option>
                                    <option value="N3">N3</option>
                                    <option value="N2">N2</option>
                                    <option value="N1">N1</option>
                                </select>
                            </div>
                            <div className='container'>
                                <label htmlFor='areaOfFocus' className='block mb-2 text-sm font-medium'>Area of Focus</label>
                                <select
                                    value={editedCourseData?.areaOfFocus}
                                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                                    onChange={(e) => {
                                        setEditedCourseData({ ...editedCourseData, areaOfFocus: e.currentTarget.value })
                                    }}
                                >
                                    <option value="Vocabulary">Vocabulary</option>
                                    <option value="Grammar">Grammar</option>
                                    <option value="Listening">Listening</option>
                                    <option value="Speaking">Speaking</option>
                                    <option value="Reading">Reading</option>
                                    <option value="Writing">Writing</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={patchCourse}
                                className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-1.5 h-[40px]"
                            >
                                Update Course
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default EditCourseForm