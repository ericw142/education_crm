import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const NewStudentModal = ({ open, onCloseModal, fetchInfo }) => {
    const [newStudent, setNewStudent] = useState({})

    useEffect(() => {
        if (!open) {
            setNewStudent({})
        }
    }, [open])

    return (
        <Modal open={open} onClose={onCloseModal} center>
            <div className='w-[600px]'>
                <h2 className='text-center text-xl font-semibold'>Enter New Student Information</h2>
                <form className='p-2 w-[500px] mx-auto'>
                    <div className="mb-5">
                        <label htmlFor='firstName' className="block mb-2 text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            id='firstName'
                            onChange={(e) => {
                                setNewStudent({...newStudent, firstName: e.currentTarget.value })
                            }}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor='lastName' className="block mb-2 text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            id='lastName'
                            onChange={(e) => {
                                setNewStudent({...newStudent, lastName: e.currentTarget.value })
                            }}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor='phone' className="block mb-2 text-sm font-medium">Phone</label>
                        <input
                            type="text"
                            id='phone'
                            onChange={(e) => {
                                setNewStudent({...newStudent, phone: e.currentTarget.value })
                            }}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor='email' className="block mb-2 text-sm font-medium">Email</label>
                        <input
                            type="text"
                            id='email'
                            onChange={(e) => {
                                setNewStudent({...newStudent, email: e.currentTarget.value })
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
                                const body = {...newStudent};
                                axios.post('http://localhost:3500/students', body)
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

export default NewStudentModal