const express = require('express')
const router = express.Router()
const lessonController = require('../controllers/lessonController')

router.route('/')
    .get(lessonController.getAllLessons)
    .post(lessonController.createNewLesson)
    .patch(lessonController.updateLesson)
    .delete(lessonController.deleteLesson)

router.route('/course')
    .get(lessonController.getLessonsByCourseId)

router.route('/teacher')
    .get(lessonController.getLessonsByTeacherId)

module.exports = router