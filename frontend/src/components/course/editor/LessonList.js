import React, { useState } from 'react'
import axios from 'axios'
import truncateString from '../../../utils/truncateString'

const LessonList = ({ lessons, fetchLessonInfo, setResultStatusMessage }) => {
    const [selectedLesson, setSelectedLesson] = useState('')

    const deleteLesson = (id) => {
        axios.delete('http://localhost:3500/lessons', { data: { id } })
        .then(() => {
            fetchLessonInfo()
        })
        .catch(err => setResultStatusMessage(err.message))
    }

    return (
        <div className='w-fit mx-auto grid grid-cols-3 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mb-10'>
            {
                lessons?.length > 0 ? lessons.map((lesson, i) => {
                    return (
                        <div
                            key={`${lesson.title}-lessonlistitem-${i}`}
                            className='p-[30px] w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl'
                            onClick={() => setSelectedLesson(lesson._id)}
                        >
                            <div className='pr-4'>
                                <div className='py-2'>
                                    <p className='font-semibold'>{lesson.title}</p>
                                    <p className='text-gray-500 text-sm'>{lesson.date}</p>
                                </div>
                                <div className='text-sm'>
                                    <p>
                                        {truncateString(lesson.description, 52)}
                                    </p>
                                </div>
                                {selectedLesson === lesson._id && (
                                    <div className='pt-2'>
                                        <button
                                            type="button"
                                            onClick={() => deleteLesson(lesson._id)}
                                            className="bg-red border border-red-300 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-1.5 h-[40px] text-red-500"
                                        >
                                            Delete Lesson
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }) : <></>
            }
        </div>
    )
}

export default LessonList