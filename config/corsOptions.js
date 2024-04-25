const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Unauthorized Origin'))
        }
    },
    methods: ["GET","POST", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions