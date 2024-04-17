const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String },
    active: { type: Boolean, required: true, default: true },
    courses: { type: Array },
    // [ { course: _id, courseName: string, startDate: Date, endDate: Date } ]
})

module.exports = mongoose.model('teachers', teacherSchema)