const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    areaOfFocus: { type: String },
    // vocabulary, grammar, listening, speaking, reading, writing
    certificationLevel: { type: String },
    // N5,N4,N3,N2,N1
    teacherId: { type: String },
    // matching _id of teacher
    studentIds: { type: Array },
})

module.exports = mongoose.model('courses', courseSchema)