import React, { useState } from 'react'
import axios from 'axios'

const CreateLessonForm = ({ courseId, teacherId, setResultStatusMessage }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)

    const createLesson = async () => {
        await axios.post('http://localhost:3500/lessons', { title, description, date, startTime, endTime, courseId, teacherId })
            .then(() => {
                setResultStatusMessage(`Lesson has been created successfully.`)
            })
            .catch(err => setResultStatusMessage(err.message))
    }

    return (
        <div>
            <form>
                <div className='mb-5'>
                    <label htmlFor='lessonTitle' className="block mb-2 text-sm font-medium">Title</label>
                    <input
                        type="text"
                        id='lessonTitle'
                        onChange={(e) => {
                            setTitle(e.currentTarget.value);
                        }}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor='lessonDescription' className="block mb-2 text-sm font-medium">Title</label>
                    <input
                        type="text"
                        id='lessonDescription'
                        onChange={(e) => {
                            setDescription(e.currentTarget.value);
                        }}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateLessonForm