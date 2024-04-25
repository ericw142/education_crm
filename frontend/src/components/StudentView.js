import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StudentSidenav from './sidenav/StudentSidenav'
import StudentPipeline from './student/StudentPipeline'
import StudentReports from './student/StudentReports'
import AllStudents from './student/AllStudents'

const StudentView = () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [students, setStudents] = useState([])
    const [selectedView, setSelectedView] = useState('Student Pipeline')

    const fetchAndUpdateStudentInfo = () => {
        axios.get(`${baseURL}/students`)
            .then((resp) => {
                if (resp?.data?.length > 0) {
                    setStudents(resp.data)
                }
            })
            .catch(err => console.log(err?.message || 'Unknown Error'));
    }

    useEffect(() => {
        fetchAndUpdateStudentInfo()
    }, [])

    return (
        <div>
            <main className='flex flex-row'>
                <StudentSidenav setSelectedView={setSelectedView}/>
                <div className='p-4 sm:ml-64 grow'>
                    <h1 className='text-center text-2xl font-bold'>{selectedView}</h1>

                    {selectedView === 'Student Pipeline' ? (
                        <StudentPipeline students={students} fetchInfo={fetchAndUpdateStudentInfo} />
                    ) : selectedView === 'All Students' ? (
                        <AllStudents students={students} fetchInfo={fetchAndUpdateStudentInfo} />
                    ) : selectedView === 'Reports' ? (
                        <StudentReports students={students} fetchInfo={fetchAndUpdateStudentInfo}/>
                    ) : <></>}
                </div>
            </main>
            <footer></footer>
        </div>
    )
}

export default StudentView