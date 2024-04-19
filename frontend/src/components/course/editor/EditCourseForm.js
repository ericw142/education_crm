import React from 'react'

const EditCourseForm = ({ courses }) => {
    return (
        <div>
            {courses?.map((course, i) => {
                if (course) {
                    return (
                        <div key={`${course.title}-courseselect-${i}`}>
                            <p>{course.title}</p>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default EditCourseForm