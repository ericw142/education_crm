const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String },
    currentlyEnrolled: { type: Boolean, required: true, default: false },
    currentlyEnrolledCourseId: { type: String },
    currentlyEnrolledCourseName: { type: String },
    enrollmentStatus: { type: String },
    // ALL STATUSES LISTED BELOW WITH CORRESPONDING DATE
    // New Lead - prospective student data has been entered into the CRM
    createdDate: { type: Date },
    // Contacted - first point of contact has been made
    contactedDate: { type: Date },
    // Interested - prospective student is interested, but not yet enrolled
    interestedDate: { type: Date },
    // Uninterested - prospective student is uninterested in enrolling
    uninterestedDate: { type: Date },
    uninterestedReason: { type: String },
    // Application Started - prospective student has started to work on enrollment application
    applicationStartedDate: { type: Date },
    // Application Completed - prospective student has completed and sent in all required forms for enrollment
    applicationCompletedDate: { type: Date },
    // Enrolled - prospective student has completed all steps and has enrolled in a course
    enrollmentDate: { type: Date },
    // Current Student - student is currently enrolled and studying with the school
    // Graduated - student has completed a course and will be returned to the pool to market additional courses
    graduatedCourses: { type: Array },  
    // [ { course: _id, courseName: string, graduatedDate: Date } ]
})

module.exports = mongoose.model('students', studentSchema)