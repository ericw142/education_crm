const Student = require('../models/Student')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all students
// @route GET /students
// @access Private
const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find().lean()
    if (!students?.length) return res.status(400).json({ message: 'No students found' })
    res.json(students)
})

// @desc Create new student
// @route POST /students
// @access Private
const createNewStudent = asyncHandler(async (req, res) => {
    const { firstName, lastName, currentlyEnrolled } = req.body

    const studentObject = { firstName, lastName, currentlyEnrolled: currentlyEnrolled !== undefined ? currentlyEnrolled : false }
    const student = await Student.create(studentObject)
    if (student) {
        res.status(201).json({ message: `New student added` })
    } else {
        res.status(400).json({ message: 'Failed to add new student' })
    }
})

// @desc Update a student
// @route PATCH /students
// @access Private
const updateStudent = asyncHandler(async (req, res) => {
    const { id, firstName, lastName, currentlyEnrolled } = req.body

    if (!id || firstName === undefined || lastName === undefined || typeof currentlyEnrolled !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const student = await Student.findById(id).exec()
    
    if (!student) {
        return res.status(400).json({ message: 'Student not found' })
    }

    student.firstName = firstName
    student.lastName = lastName
    student.currentlyEnrolled = currentlyEnrolled

    const updatedStudent = await student.save()

    res.json({ message: `Student ${updatedStudent.firstName} ${updatedStudent.lastName} updated`})
})

// @desc Delete a student
// @route DELETE /students
// @access Private
const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'Student ID Required' })
    }
    const student = await Student.findById(id).exec()
    if (!student) return res.status(400).json({ message: 'Student not found' })

    const result = await student.deleteOne()
    const reply = `Student with ID ${id} deleted`;
    res.json(reply)
})

module.exports = { getAllStudents, createNewStudent, updateStudent, deleteStudent }