import React from 'react'
import PipelineByWeek from './PipelineByWeek'

const StudentReports = ({ students }) => {
    return (
        <div>
            <PipelineByWeek students={students}/>
        </div>
    )
}

export default StudentReports