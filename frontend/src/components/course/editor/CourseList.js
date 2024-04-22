import React from 'react'
import truncateString from '../../../utils/truncateString'

const CourseList = ({ courses, onClickFn, selectedId }) => {
    return (
        <dl className='max-w-[385px] text-gray-900 divide-y divide-gray-200'>
            {
                courses?.length > 0 ? courses.map((course, i) => {
                    if (course) {
                        return (
                            <div
                                key={`${course.title}-courseselect-${i}`}
                                onClick={() => onClickFn({...course})}
                                className={selectedId === course._id ? 'flex flex-col pb-3 cursor-pointer rounded bg-slate-200' : 'flex flex-col pb-3 cursor-pointer rounded'}
                            >
                                <dd className="text-lg font-semibold">{course.title}</dd>
            
                                <dt className="mb-1 text-gray-500 md:text-lg">{truncateString(course.description, 42)}</dt>
                            </div>
                        )
                    }
                    return <></>
                }) : <></>
            }
        </dl>
    )
}

export default CourseList