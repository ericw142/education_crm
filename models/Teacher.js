const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    active: { type: Boolean, required: true, default: true }
})

module.exports = mongoose.model('teachers', teacherSchema)