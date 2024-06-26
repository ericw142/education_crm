const express = require('express')
const router = express.Router()
const studentController = require('../controllers/studentController')

router.route('/')
    .get(studentController.getAllStudents)
    .post(studentController.createNewStudent)
    .patch(studentController.updateStudent)
    .delete(studentController.deleteStudent)

router.route('/enrollmentStatus')
    .get(studentController.getStudentsByEnrollmentStatus)

module.exports = router