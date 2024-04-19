const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    date: { type: String },
    // "mm/dd/yyyy"
    startTime: { type: Number },
    endTime: { type: Number },
    courseId: { type: String, required: true },
    teacherId: { type: String, required: true },
})

module.exports = mongoose.model('lessons', lessonSchema)
