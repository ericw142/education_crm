import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CourseList from './CourseList'
import CreateLessonForm from './CreateLessonForm'
import LessonList from './LessonList'

const EditCourseForm = ({ courses, teachers, fetchCourseInfo, editedCourseData, setEditedCourseData }) => {
    const [resultStatusMessage, setResultStatusMessage] = useState('')
    const [showCreateLessonForm, setShowCreateLessonForm] = useState(false)
    const [lessons, setLessons] = useState([])

    const formatForDateInput = (dateVal) => {
        const year = dateVal.getFullYear();
        const month = String(dateVal.getMonth() + 1).padStart(2, '0');
        const day = String(dateVal.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const patchCourse = async () => {
        if (!editedCourseData || !editedCourseData?._id) {
            return;
        }

        await axios.patch('http://localhost:3500/courses', editedCourseData)
            .then(() => {
                setResultStatusMessage(`${editedCourseData.title || 'Course'} has been updated successfully.`)
                setEditedCourseData({})
                fetchCourseInfo()
            })
            .catch(err => setResultStatusMessage(err.message))
    }

    const deleteCourse = async () => {
        if (!editedCourseData || !editedCourseData?._id) {
            return;
        }

        await axios.delete('http://localhost:3500/courses', { data: { id: editedCourseData._id } })
            .then(() => {
                setResultStatusMessage('Course deleted')
                setEditedCourseData({})
                fetchCourseInfo()
            })
            .catch(err => setResultStatusMessage(err.message))
    }

    const fetchLessonInfo = () => {
        axios.get(`http://localhost:3500/lessons/course/${editedCourseData?._id}`)
            .then((resp) => {
                if (resp?.data?.length > 0) {
                    setLessons(resp.data)
                } else {
                    setLessons([])
                }
            })
            .catch(err => {
                console.log(err?.message || 'Unknown Error')
                setLessons([])
            });
    }

    useEffect(() => {
        fetchLessonInfo()
    }, [editedCourseData?._id])

    useEffect(() => {
        if (resultStatusMessage) {
            setTimeout(() => setResultStatusMessage(''), 6000)
        }
    }, [resultStatusMessage])

    return (
        <div>
            <div className='flex flex-row gap-2'>
                <CourseList courses={courses} onClickFn={setEditedCourseData} selectedId={editedCourseData?._id} />

                <div className='container'>
                    {resultStatusMessage && <p>{resultStatusMessage}</p>}
                    {editedCourseData?._id && (
                        <div>
                            <form>
                                <h6 className='font-bold text-lg mb-2'>Course</h6>
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
                                                return <option key={teacher?._id} value={teacher?._id}>{teacher?.firstName} {teacher?.lastName}</option>
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
                                            value={editedCourseData?.startDate ? formatForDateInput(new Date(editedCourseData.startDate)) : ''}
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
                                            value={editedCourseData?.endDate ? formatForDateInput(new Date(editedCourseData.endDate)) : ''}
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
                                <div className='flex flex-row justify-between pb-5'>
                                    <button
                                        type="button"
                                        onClick={patchCourse}
                                        className="bg-white border border-green-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-1.5 h-[40px] text-green-600"
                                    >
                                        Update Course
                                    </button>
                                    <button
                                        type="button"
                                        onClick={deleteCourse}
                                        className="bg-red border border-red-300 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-1.5 h-[40px] text-red-500"
                                    >
                                        Delete Course
                                    </button>
                                </div>
                            </form>

                            <h6 className='font-bold text-lg mb-2'>Lessons</h6>
                            <div className='flex flex-row justify-start gap-11'>
                                <p className='mt-2'>{lessons?.length > 0 ? `${lessons.length} lesson${lessons?.length > 1 ? 's' : ''}.` : 'No lessons yet.'}</p>
                                <button
                                    onClick={() => setShowCreateLessonForm(true)}
                                    className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-1.5 h-[40px] mb-5"
                                >
                                    Create Lesson
                                </button>
                            </div>
                                
                                {showCreateLessonForm ? (
                                    <CreateLessonForm
                                        courseId={editedCourseData?._id}
                                        teacherId={editedCourseData?.teacherId}
                                        setResultStatusMessage={setResultStatusMessage}
                                        fetchLessonInfo={fetchLessonInfo}
                                        setShowCreateLessonForm={setShowCreateLessonForm}
                                    />
                                ) : (
                                    <div>
                                        <LessonList lessons={lessons} fetchLessonInfo={fetchLessonInfo} setResultStatusMessage={setResultStatusMessage}/>
                                    </div>
                                )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditCourseForm