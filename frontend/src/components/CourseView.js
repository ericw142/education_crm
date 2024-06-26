import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CourseSidenav from './sidenav/CourseSidenav'
import CourseSchedule from './course/CourseSchedule'
import CoursePlanner from './course/CoursePlanner'

const CourseView = () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [selectedView, setSelectedView] = useState('Course Planner')
    const [courses, setCourses] = useState([])
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])

    const fetchAndUpdateCourseInfo = () => {
        axios.get(`${baseURL}/courses`)
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
        axios.get(`${baseURL}/teachers`)
            .then((resp) => {
                if (resp?.data?.length > 0) {
                    setTeachers(resp.data)
                }
            })
            .catch(err => console.log(err?.message || 'Unknown Error'));
    }

    const fetchAndUpdateStudentInfo = async () => {
        let allStudents = [];
        await axios.get(`${baseURL}/students/enrollmentStatus?status=Enrolled`)
            .then((resp) => {
                if (resp?.data?.length > 0) {
                    allStudents.push(...resp.data);
                }
            })
            .catch(err => {
                console.log(err?.message || 'Unknown Error')
            });
        await axios.get(`${baseURL}/students/enrollmentStatus?status=Application%20Completed`)
            .then((resp) => {
                if (resp?.data?.length > 0) {
                    allStudents.push(...resp.data);
                }
            })
            .catch(err => {
                console.log(err?.message || 'Unknown Error')
            });
        allStudents.sort((a, b) => a.firstName.localeCompare(b.firstName))
        setStudents(allStudents)
    }

    useEffect(() => {
        async function fetchAllData() {
            fetchAndUpdateCourseInfo()
            fetchAndUpdateTeacherInfo()
            await fetchAndUpdateStudentInfo()
        }
        fetchAllData()
    }, [])

    return (
        <div>
            <main className='flex flex-row'>
                <CourseSidenav setSelectedView={setSelectedView}/>
                <div className='p-4 sm:ml-64 grow'>
                    {selectedView === 'Course Planner' ? (
                        <CoursePlanner courses={courses} teachers={teachers} students={students} fetchCourseInfo={fetchAndUpdateCourseInfo}/>
                    ) : (
                        <CourseSchedule />
                    )}
                </div>
            </main>
        </div>
    )
}

export default CourseView