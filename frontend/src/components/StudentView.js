import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StudentTable from './student/StudentTable'
import StudentSidenav from './sidenav/StudentSidenav'

const StudentView = () => {
    const [students, setStudents] = useState([])
    const [selectedView, setSelectedView] = useState('Current Students')

    useEffect(() => {
        axios.get('http://localhost:3500/students')
            .then((resp) => {
                if (resp?.data?.length > 0) {
                    setStudents(resp.data)
                }
            })
            .catch(err => console.log(err?.message || 'Unknown Error'));
    }, [])

    return (
        <div>
            <main className='flex flex-row'>
                <StudentSidenav setSelectedView={setSelectedView}/>
                <div className='p-4 sm:ml-64 grow'>
                    <h1 className='text-center text-2xl font-bold'>{selectedView}</h1>

                    {selectedView === 'Current Students' ? (
                        <StudentTable students={students} />
                    ) : <></>}
                </div>
            </main>
            <footer></footer>
        </div>
    )
}

export default StudentView