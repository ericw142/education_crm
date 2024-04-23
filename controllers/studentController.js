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

// @desc Get all students
// @route GET /students/enrollmentStatus?enrollmentStatus=""
// @access Private
const getStudentsByEnrollmentStatus = asyncHandler(async (req, res) => {
    console.log(req.query.status)
    const students = await Student.find({ enrollmentStatus: req.query.status }).lean()
    if (!students?.length) return res.status(400).json({ message: 'No students found' })
    res.json(students)
})

// @desc Create new student
// @route POST /students
// @access Private
const createNewStudent = asyncHandler(async (req, res) => {
    const { 
        firstName, 
        lastName,
        phone, 
        email, 
    } = req.body;

    const studentObject = { 
        firstName, 
        lastName, 
        phone, 
        email, 
        currentlyEnrolled: false, 
        enrollmentStatus: 'New Lead',
        createdDate: new Date(),
    }
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
    const { 
        _id, 
        firstName, 
        lastName, 
        phone, 
        email, 
        enrollmentStatus 
    } = req.body;

    if (
        !_id || 
        firstName === undefined || 
        lastName === undefined || 
        phone === undefined || 
        email === undefined || 
        enrollmentStatus === undefined
    ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const student = await Student.findById(_id).exec()
    
    if (!student) {
        return res.status(400).json({ message: 'Student not found' })
    }

    let currentlyEnrolled = false;
    if (enrollmentStatus === 'Enrolled') {
        currentlyEnrolled = true;
    }

    student.firstName = firstName
    student.lastName = lastName
    student.phone = phone
    student.email = email
    student.currentlyEnrolled = currentlyEnrolled
    student.enrollmentStatus = enrollmentStatus

    if (enrollmentStatus === 'Contacted') {
        student.contactedDate = new Date()
    }
    if (enrollmentStatus === 'Interested') {
        student.interestedDate = new Date()
    }
    if (enrollmentStatus === 'Uninterested') {
        student.uninterestedDate = new Date()
    }
    if (enrollmentStatus === 'Application Started') {
        student.applicationStartedDate = new Date()
    }
    if (enrollmentStatus === 'Application Completed') {
        student.applicationCompletedDate = new Date()
    }
    if (enrollmentStatus === 'Enrolled') {
        student.enrollmentDate = new Date()
    }
    if (enrollmentStatus === 'Graduated') {
        // enter course info for the graduated course { course: _id, courseName: string, graduatedDate: new Date() }
    }

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

module.exports = { getAllStudents, getStudentsByEnrollmentStatus, createNewStudent, updateStudent, deleteStudent }