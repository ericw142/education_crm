const Lesson = require('../models/Lesson')
const asyncHandler = require('express-async-handler')

// @desc Get all lessons
// @route GET /lessons
// @access Private
const getAllLessons = asyncHandler(async (req, res) => {
    const lessons = await Lesson.find().lean()
    if (!lessons?.length) return res.status(400).json({ message: 'No lessons found' })
    res.json(lessons)
})

// @desc Get lessons by courseId
// @route GET /lessons/course/:courseId
// @access Private
const getLessonsByCourseId = asyncHandler(async (req, res) => {
    const courseId = req.params.courseId;
    const lessons = await Lesson.find({ courseId }).lean()
    if (!lessons?.length) return res.status(400).json({ message: 'No lessons found' })
    res.json(lessons)
})

// @desc Get lessons by teacherId
// @route GET /lessons/teacher/:teacherId
// @access Private
const getLessonsByTeacherId = asyncHandler(async (req, res) => {
    const teacherId = req.params.teacherId;
    const lessons = await Lesson.find({ teacherId }).lean()
    if (!lessons?.length) return res.status(400).json({ message: 'No lessons found' })
    res.json(lessons)
})

// @desc Create new lesson
// @route POST /lessons
// @access Private
const createNewLesson = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        date,
        startTime,
        endTime,
        courseId,
        teacherId,
    } = req.body;

    if (!courseId || !teacherId) return res.status(400).json({ message: 'CourseId and TeacherId are required.' })

    const lessonObject = {
        title,
        description,
        date,
        startTime,
        endTime,
        courseId,
        teacherId,
    }
    const lesson = await Lesson.create(lessonObject)
    if (lesson) {
        res.status(201).json({ message: 'New lesson added' })
    } else {
        res.status(400).json({ message: 'Failed to add new lesson' })
    }
})

// @desc Update a lesson
// @route PATCH /lessons
// @access Private
const updateLesson = asyncHandler(async (req, res) => {
    const {
        _id,
        title,
        description,
        date,
        startTime,
        endTime,
        courseId,
        teacherId,
    } = req.body

    if (
        !_id ||
        title === undefined ||
        description === undefined ||
        date === undefined ||
        startTime === undefined ||
        endTime === undefined ||
        !courseId ||
        !teacherId
    ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const lesson = await Lesson.findById(_id).exec()

    if (!lesson) {
        return res.status(400).json({ message: 'Lesson not found' })
    }

    lesson.title = title
    lesson.description = description
    lesson.date = date
    lesson.startTime = startTime
    lesson.endTime = endTime
    lesson.courseId = courseId
    lesson.teacherId = teacherId

    const updatedLesson = await lesson.save()

    res.json({ message: `Lesson ${title} updated` })
})

// @desc Delete a lesson
// @route DELETE /lessons
// @access Private
const deleteLesson = asyncHandler(async (req, res) => {
    const { id } = req.body
    if(!id) {
        return res.status(400).json({ message: 'Lesson ID Required' })
    }
    const lesson = await Lesson.findById(id).exec()
    if (!lesson) return res.status(400).json({ message: 'Lesson not found' })

    const result = await lesson.deleteOne()
    res.json(`Lesson with ID ${id} deleted`)
})

module.exports = { getAllLessons, getLessonsByCourseId, getLessonsByTeacherId, createNewLesson, updateLesson, deleteLesson }