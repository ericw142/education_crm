import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StudentTable from './student/StudentTable'
import StudentSidenav from './sidenav/StudentSidenav'
import StudentPipeline from './student/StudentPipeline'

const StudentView = () => {
    const [students, setStudents] = useState([])
    const [selectedView, setSelectedView] = useState('Current Students')

    const fetchAndUpdateStudentInfo = () => {
        axios.get('http://localhost:3500/students')
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

                    {selectedView === 'Current Students' ? (
                        <StudentTable students={students} fetchInfo={fetchAndUpdateStudentInfo} enrollmentStatus={'Current Student'} />
                    ) : selectedView === 'Student Pipeline' ? (
                        <StudentPipeline students={students} fetchInfo={fetchAndUpdateStudentInfo} />
                    ) : <></>}
                </div>
            </main>
            <footer></footer>
        </div>
    )
}

export default StudentView