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
                        <label htmlFor='currentlyEnrolledCourseName' className="block mb-2 text-sm font-medium">Currently Enrolled In</label>
                        <input
                            required
                            type="text"
                            id='currentlyEnrolledCourseName'
                            defaultValue={student?.currentlyEnrolledCourseName}
                            onChange={(e) => {
                                setUpdatedStudentData({...updatedStudentData, currentlyEnrolledCourseName: e.currentTarget.value })
                            }}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
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
                                const body = { 
                                    id: updatedStudentData._id,
                                    firstName: updatedStudentData.firstName,
                                    lastName: updatedStudentData.lastName,
                                    phone: updatedStudentData.phone,
                                    email: updatedStudentData.email,
                                    currentlyEnrolled: updatedStudentData.currentlyEnrolled,
                                    currentlyEnrolledCourseName: updatedStudentData.currentlyEnrolledCourseName,
                                };
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