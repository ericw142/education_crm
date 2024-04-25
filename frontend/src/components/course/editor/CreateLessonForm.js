import React, { useState } from 'react'
import axios from 'axios'

const CreateLessonForm = ({ courseId, teacherId, setResultStatusMessage, fetchLessonInfo, setShowCreateLessonForm }) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)

    const createLesson = async () => {
        const lessonData = { title, description, date, startTime, endTime, courseId, teacherId };
        await axios.post(`${baseURL}/lessons`, lessonData)
            .then(() => {
                setResultStatusMessage(`Lesson has been created successfully.`);
                fetchLessonInfo();
                setShowCreateLessonForm(false);
            })
            .catch(err => setResultStatusMessage(err.message))
    }

    return (
        <div>
            <form>
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium">Title</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setTitle(e.currentTarget.value);
                        }}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium">Description</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setDescription(e.currentTarget.value);
                        }}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium">Lesson Date</label>
                    <input
                        required
                        type="date"
                        onChange={(e) => {
                            if (e?.currentTarget?.value) {
                                const parts = e.currentTarget.value.split('-');
                                const mm = parseInt(parts[1], 10);
                                const dd = parseInt(parts[2], 10);
                                const yyyy = parseInt(parts[0], 10);
                                setDate(`${mm}/${dd}/${yyyy}`);
                            }
                        }}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium">Start Time</label>
                    <select
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                        onChange={(e) => {
                            if (e?.currentTarget?.value) {
                                setStartTime(parseInt(e.currentTarget.value))
                            }
                        }}
                    >
                        <option value=""></option>
                        <option value="9">9 am</option>
                        <option value="10">10 am</option>
                        <option value="11">11 am</option>
                        <option value="12">12 pm</option>
                        <option value="13">1 pm</option>
                        <option value="14">2 pm</option>
                        <option value="15">3 pm</option>
                        <option value="16">4 pm</option>
                        <option value="17">5 pm</option>
                        <option value="18">6 pm</option>
                        <option value="19">7 pm</option>
                        <option value="20">8 pm</option>
                    </select>
                </div>
                <div className='mb-5'>
                    <label className="block mb-2 text-sm font-medium">End Time</label>
                    <select
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                        onChange={(e) => {
                            if (e?.currentTarget?.value) {
                                setEndTime(parseInt(e.currentTarget.value))
                            }
                        }}
                    >
                        <option value=""></option>
                        <option value="9">9 am</option>
                        <option value="10">10 am</option>
                        <option value="11">11 am</option>
                        <option value="12">12 pm</option>
                        <option value="13">1 pm</option>
                        <option value="14">2 pm</option>
                        <option value="15">3 pm</option>
                        <option value="16">4 pm</option>
                        <option value="17">5 pm</option>
                        <option value="18">6 pm</option>
                        <option value="19">7 pm</option>
                        <option value="20">8 pm</option>
                    </select>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={createLesson}
                        className="bg-white border border-green-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-1.5 h-[40px] text-green-600"
                    >
                        Create Lesson
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateLessonForm