import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TeacherSideNav from './sidenav/TeacherSidenav'
import TeacherGrid from './teacher/TeacherGrid'

const TeacherView = () => {
    const [selectedView, setSelectedView] = useState('View Teachers')
    const [teachers, setTeachers] = useState ([])

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
        fetchAndUpdateTeacherInfo()
    }, [])

    return (
        <div>
            <main className='flex flex-row'>
                <TeacherSideNav setSelectedView={setSelectedView}/>
                {selectedView === 'View Teachers' ? (
                    <TeacherGrid teachers={teachers}/>
                ) : <></>}
            </main>
        </div>
    )
}

export default TeacherView