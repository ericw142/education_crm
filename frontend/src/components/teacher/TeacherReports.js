import React from 'react'
import HoursWorked from './HoursWorked'

const TeacherReports = ({ teachers }) => {
    return (
        <div>
            <HoursWorked teachers={teachers}/>
        </div>
    )
}

export default TeacherReports