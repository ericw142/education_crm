const Teacher = require('../models/Teacher')
const asyncHandler = require('express-async-handler')

// @desc Get all teachers
// @route GET /teachers
// @access Private
const getAllTeachers = asyncHandler(async (req, res) => {
    const teachers = await Teacher.find().lean()
    if (!teachers?.length) return res.status(400).json({ message: 'No teachers found' })
    res.json(teachers)
})

// @desc Create new teacher
// @route POST /teachers
// @access Private
const createNewTeacher = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        phone,
        email,
    } = req.body;

    const teacherObject = {
        firstName,
        lastName,
        phone,
        email,
        active: true,
        courses: [],
    }
    const teacher = await Teacher.create(teacherObject)
    if (teacher) {
        res.status(201).json({ message: 'New teacher added' })
    } else {
        res.status(400).json({ message: 'Failed to add new teacher' })
    }
})

// @desc Update a teacher
// @route PATCH /teachers
// @access Private
const updateTeacher = asyncHandler(async (req, res) => {
    const {
        _id,
        firstName,
        lastName,
        phone,
        email,
        active,
        courses,
    } = req.body;

    if (
        !_id ||
        firstName === undefined || 
        lastName === undefined || 
        phone === undefined || 
        email === undefined || 
        typeof active !== Boolean ||
        courses === undefined
    ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const teacher = await Teacher.findById(_id).exec()

    if (!teacher) {
        return res.status(400).json({ message: 'Teacher not found' })
    }

    teacher.firstName = firstName
    teacher.lastName = lastName
    teacher.phone = phone
    teacher.email = email
    teacher.active = active
    teacher.courses = courses

    const updatedTeacher = await teacher.save()

    res.json({ message: `Teacher ${updatedTeacher.firstName} ${updateTeacher.lastName} updated` })
})

// @desc Delete a teacher
// @route DELETE /teachers
// @access Private
const deleteTeacher = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'Teacher ID Required' })
    }
    const teacher = await Teacher.findById(id).exec()
    if (!teacher) return res.status(400).json({ message: 'Teacher not found' })

    const result = await teacher.deleteOne()
    const reply = `Teacher with ID ${id} deleted`;
    res.json(reply)
})

module.exports = { getAllTeachers, createNewTeacher, updateTeacher, deleteTeacher }