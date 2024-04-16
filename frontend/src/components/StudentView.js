import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StudentTable from './student/StudentTable'

const StudentView = () => {
    const [students, setStudents] = useState([])

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
            <main>
                <h1>Students</h1>
                <StudentTable students={students} />
            </main>
            <footer></footer>
        </div>
    )
}

export default StudentView