const Course = require('../models/Course')
const asyncHandler = require('express-async-handler')

// @desc Get all courses
// @route GET /courses
// @access Private
const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find().lean()
    if (!courses?.length) return res.status(400).json({ message: 'No courses found' })
    res.json(courses)
})

// @desc Create new course
// @route POST /courses
// @access Private
const createNewCourse = asyncHandler(async (req, res) => {
    const {
        name,
        startDate,
        endDate,
        areaOfFocus,
        certificationLevel,
        teacherId,
        studentIds,
    } = req.body;

    const courseObject = {
        name,
        startDate,
        endDate,
        areaOfFocus,
        certificationLevel,
        teacherId,
        studentIds,
    }
    const course = await Course.create(courseObject)
    if (course) {
        res.status(201).json({ message: 'New course added' })
    } else {
        res.status(400).json({ message: 'Failed to add new course' })
    }
})

// @desc Update a course
// @route PATCH /courses
// @access Private
const updateCourse = asyncHandler(async (req, res) => {
    const {
        _id,
        name,
        startDate,
        endDate,
        areaOfFocus,
        certificationLevel,
        teacherId,
        studentIds,
    } = req.body;

    if (
        !_id ||
        name === undefined ||
        startDate === undefined ||
        endDate === undefined ||
        areaOfFocus === undefined ||
        certificationLevel === undefined ||
        teacherId === undefined ||
        studentIds === undefined
    ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const course = await Course.findById(_id).exec()

    if (!course) {
        return res.status(400).json({ message: 'Course not found' })
    }

    course.name = name
    course.startDate = startDate
    course.endDate = endDate
    course.areaOfFocus = areaOfFocus
    course.certificationLevel = certificationLevel
    course.teacherId = teacherId
    course.studentIds = studentIds

    const updatedCourse = await course.save()

    res.json({ message: `Course ${name} updated`})
})

// @desc Delete a course
// @route DELETE /courses
// @access Private
const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.body
    if(!id) {
        return res.status(400).json({ message: 'Course ID Required' })
    }
    const course = await Course.findById(id).exec()
    if (!course) return res.status(400).json({ message: 'Course not found' })

    const result = await course.deleteOne()
    res.json(`Course with ID ${id} deleted`)
})

module.exports = { getAllCourses, createNewCourse, updateCourse, deleteCourse }