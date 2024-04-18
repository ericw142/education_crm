import React from 'react'
import SidenavButton from './SidenavButton'

const CourseSidenav = ({ setSelectedView }) => {
    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
                <h3 className='text-2xl text-white font-extrabold ml-2'>Courses</h3>
                <ul className="space-y-2 font-medium">
                    <SidenavButton buttonText={'Course Planner'} setSelectedView={setSelectedView}/>
                    <SidenavButton buttonText={'Course Schedule'} setSelectedView={setSelectedView}/>
                </ul>
            </div>
        </aside>
    )
}

export default CourseSidenav