const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController')

router.route('/')
    .get(courseController.getAllTeachers)
    .post(courseController.createNewTeacher)
    .patch(courseController.updateTeacher)
    .delete(courseController.deleteTeacher)

module.exports = router