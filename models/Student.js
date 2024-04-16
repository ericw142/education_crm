const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String },
    currentlyEnrolled: { type: Boolean, required: true, default: false },
    currentlyEnrolledCourse: { type: String },
})

module.exports = mongoose.model('students', studentSchema)