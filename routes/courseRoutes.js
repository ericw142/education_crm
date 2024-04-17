const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController')

router.route('/')
    .get(courseController.getAllCourses)
    .post(courseController.createNewCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)

module.exports = router