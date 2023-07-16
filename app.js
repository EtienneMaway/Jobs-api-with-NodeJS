require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const connectDb = require('./db/dbConnect')
const LoginRouter = require('./routes/login-route')
const cookieParser = require('cookie-parser')
const jwtVerify = require('./middlewares/jwt-verify')
const jobsRouter = require('./routes/job')
const logoutRouter = require('./routes/logout')
const corsOptions = require('./config/cors-options')
const credentials = require('./middlewares/credentials')
const refreshRouter = require('./routes/refresh-router')
const registerRouter = require('./routes/register-route')
const errorhandlerMiddleware = require('./middlewares/error-handler')
const app = express()

// Extra Security Packages
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

app.set('trust proxy', 1)
app.use(rateLimiter(
    rateLimiter({
        windowMS: 15 * 60 * 60 * 1000,   // 15 minutes
        max: 100
    })
))
app.use(express.json())
app.use(cors(corsOptions))
app.use(xss())
app.use(helmet())

// Handle options credentials check - before CORS
// and fetch cookies credentials requirement
app.use(credentials)

app.use(cookieParser())

// routes
app.use('/api/v1/register', registerRouter)
app.use('/api/v1/login', LoginRouter)
app.use('/api/v1/refresh', refreshRouter)
app.use('/api/v1/logout', logoutRouter)

app.get('/', (req, res) => {
    res.send('Jobs Api')
})

app.use(jwtVerify) // verify token middleware
app.use('/api/v1/jobs', jobsRouter)
app.use(errorhandlerMiddleware)

const PORT = process.env.PORT || 5500

const start = async () => {
        await connectDb(process.env.DATABASE_URI)
    console.log('connected to the databse')
    app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`)
})
}

start()
