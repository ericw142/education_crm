import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CourseSidenav from './sidenav/CourseSidenav'
import CourseSchedule from './course/CourseSchedule'
import CoursePlanner from './course/CoursePlanner'

const CourseView = () => {
    const [selectedView, setSelectedView] = useState('Course Planner')
    const [courses, setCourses] = useState([])
    const [teachers, setTeachers] = useState([])

    const fetchAndUpdateCourseInfo = () => {
        axios.get('http://localhost:3500/courses')
            .then((resp) => {
                if (resp?.data?.length > 0) {
                    setCourses(resp.data)
                } else {
                    setCourses([])
                }
            })
            .catch(err => {
                console.log(err?.message || 'Unknown Error')
                setCourses([])
            });
    }

    const fetchAndUpdateTeacherInfo = () => {
        axios.get('http://localhost:3500/teachers')
            .then((resp) => {
                if (resp?.data?.length > 0) {
                    setTeachers(resp.data)
                }
            })
            .catch(err => console.log(err?.message || 'Unknown Error'));
    }

    useEffect(() => {
        fetchAndUpdateCourseInfo()
        fetchAndUpdateTeacherInfo()
    }, [])

    return (
        <div>
            <main className='flex flex-row'>
                <CourseSidenav setSelectedView={setSelectedView}/>
                <div className='p-4 sm:ml-64 grow'>
                    {selectedView === 'Course Planner' ? (
                        <CoursePlanner courses={courses} teachers={teachers} fetchCourseInfo={fetchAndUpdateCourseInfo}/>
                    ) : (
                        <CourseSchedule />
                    )}
                </div>
            </main>
        </div>
    )
}

export default CourseView