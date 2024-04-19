import React, { useState } from 'react'
import NewCourseForm from './editor/NewCourseForm'

const CoursePlanner = ({ courses, teachers }) => {

    return (
        <div className='px-4 pt-5'>
            <h1 className='text-center text-2xl font-bold'>Course Planner</h1>
            <div className='flex flex-row pt-5'>
                <div className='px-4'>
                    <p>Courses</p>
                    {courses?.map((course, i) => {
                        if (course) {
                            return (
                                <div>
                                    <p>{course.title}</p>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className='px-4 container'>
                    <p>Editor</p>
                    <NewCourseForm teachers={teachers}/>
                </div>
            </div>
        </div>
    )
}

export default CoursePlanner