const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    role: { type: String },
    phone: { type: String },
    email: { type: String },
    active: { type: Boolean, required: true, default: true },
    hireDate: { type: Date, required: true, default: new Date() },
    courses: { type: Array },
    // [ { course: _id, courseName: string, startDate: Date, endDate: Date } ]
})

module.exports = mongoose.model('teachers', teacherSchema)