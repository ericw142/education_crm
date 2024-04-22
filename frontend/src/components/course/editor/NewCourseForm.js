import React, { useState } from 'react'
import axios from 'axios'

const NewCourseForm = ({ teachers, fetchCourseInfo }) => {
    const [newCourseData, setNewCourseData] = useState({
        title: '',
        description: '',
        teacherId: '',
        startDate: new Date(),
        endDate: new Date(),
        certificationLevel: 'N5',
        areaOfFocus: 'Vocabulary'
    })

    const postNewCourse = async () => {
        if (
            !newCourseData?.title ||
            !newCourseData?.description ||
            !newCourseData?.teacherId ||
            !newCourseData?.startDate ||
            !newCourseData?.endDate ||
            !newCourseData?.certificationLevel ||
            !newCourseData?.areaOfFocus
        ) {
            console.log('All fields required')
            return;
        }

        await axios.post('http://localhost:3500/courses', newCourseData)
            .then(() => {
                console.log('Created new course')
                fetchCourseInfo()
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div>
            <form>
                <div className="mb-5 flex flex-row gap-2">
                    <div className='container'>
                        <label htmlFor='title' className="block mb-2 text-sm font-medium">Title</label>
                        <input
                            required
                            type="text"
                            id='title'
                            onChange={(e) => {
                                setNewCourseData({ ...newCourseData, title: e.currentTarget.value });
                            }}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className='container'>
                        <label htmlFor='teacher' className="block mb-2 text-sm font-medium">Teacher</label>
                        <select
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                            onChange={(e) => {
                                setNewCourseData({ ...newCourseData, teacherId: e.currentTarget.value })
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
                        onChange={(e) => {
                            setNewCourseData({ ...newCourseData, description: e.currentTarget.value });
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
                            onChange={(e) => {
                                setNewCourseData({ ...newCourseData, startDate: e.currentTarget.value });
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
                            onChange={(e) => {
                                setNewCourseData({ ...newCourseData, endDate: e.currentTarget.value });
                            }}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                </div>
                <div className='mb-5 flex flex-row gap-2'>
                    <div className='container'>
                        <label htmlFor='certificationLevel' className='block mb-2 text-sm font-medium'>JLPT Level</label>
                        <select
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                            onChange={(e) => {
                                setNewCourseData({ ...newCourseData, certificationLevel: e.currentTarget.value })
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
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                            onChange={(e) => {
                                setNewCourseData({ ...newCourseData, areaOfFocus: e.currentTarget.value })
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
                        onClick={postNewCourse}
                        className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-1.5 h-[40px]"
                    >
                        + Add New Course
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewCourseForm