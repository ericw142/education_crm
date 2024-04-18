import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CourseSidenav from './sidenav/CourseSidenav'

const CourseView = () => {
    const [selectedView, setSelectedView] = useState('Course Planner')
    const [courses, setCourses] = useState([])

    const fetchAndUpdateCourseInfo = () => {
        axios.get('http://localhost:3500/courses')
            .then((resp) => {
                if (resp?.data?.length > 0) {
                    setCourses(resp.data)
                }
            })
            .catch(err => console.log(err?.message || 'Unknown Error'));
    }

    useEffect(() => {
        fetchAndUpdateCourseInfo()
    }, [])

    return (
        <div>
            <main className='flex flex-row'>
                <CourseSidenav />
            </main>
        </div>
    )
}

export default CourseView