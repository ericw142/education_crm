import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const StudentEditorModal = ({ open, onCloseModal, student, fetchInfo }) => {
    const [updatedStudentData, setUpdatedStudentData] = useState({})

    useEffect(() => {
        if (open) {
            setUpdatedStudentData({...student})
        } else {
            setUpdatedStudentData({})
        }
    }, [open, student])

    return (
        <Modal open={open} onClose={onCloseModal} center>
            <div className='w-[600px]'>
                <h2 className='text-center text-xl font-semibold'>Edit Student Information</h2>
                <form className='p-2 w-[500px] mx-auto'>
                    <div className="mb-5">
                        <label htmlFor='firstName' className="block mb-2 text-sm font-medium">First Name</label>
                        <input
                            required
                            type="text"
                            id='firstName'
                            defaultValue={student?.firstName}
                            onChange={(e) => {
                                setUpdatedStudentData({...updatedStudentData, firstName: e.currentTarget.value })
                            }}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor='lastName' className="block mb-2 text-sm font-medium">Last Name</label>
                        <input
                            required
                            type="text"
                            id='lastName'
                            defaultValue={student?.lastName}
                            onChange={(e) => {
                                setUpdatedStudentData({...updatedStudentData, lastName: e.currentTarget.value })
                            }}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor='phone' className="block mb-2 text-sm font-medium">Phone</label>
                        <input
                            required
                            type="text"
                            id='phone'
                            defaultValue={student?.phone}
                            onChange={(e) => {
                                setUpdatedStudentData({...updatedStudentData, phone: e.currentTarget.value })
                            }}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor='email' className="block mb-2 text-sm font-medium">Email</label>
                        <input
                            required
                            type="text"
                            id='email'
                            defaultValue={student?.email}
                            onChange={(e) => {
                                setUpdatedStudentData({...updatedStudentData, email: e.currentTarget.value })
                            }}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor='enrollmentStatus' className="block mb-2 text-sm font-medium">Enrollment Status</label>
                        <select 
                            id="enrollmentStatus"
                            defaultValue={student?.enrollmentStatus}
                            onChange={(e) => setUpdatedStudentData({...updatedStudentData, enrollmentStatus: e.currentTarget.value})} 
                            className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option value="New Lead">New Leads</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Interested">Interested</option>
                            <option value="Uninterested">Uninterested</option>
                            <option value="Application Started">Application Started</option>
                            <option value="Application Completed">Application Completed</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Current Student">Current Students</option>
                            <option value="Graduated">Graduated</option>
                        </select>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <button
                            type="button"
                            onClick={onCloseModal}
                            className="text-red-400 border-red-400 border-2 hover:bg-red-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                const body = {...updatedStudentData};
                                axios.patch('http://localhost:3500/students', body)
                                .then(() => {
                                    onCloseModal()
                                    fetchInfo()
                                })
                                .catch(err => console.log(err?.message || 'Unknown Error'));
                            }}
                            className="text-blue-700 border-blue-700 border-2 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default StudentEditorModal