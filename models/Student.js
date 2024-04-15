const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    currentlyEnrolled: { type: Boolean, required: true, default: false }
})

module.exports = mongoose.model('students', studentSchema)