const express = require('express')
const logoutHandler = require('../controllers/logoutController')
const logoutRouter = express.Router()


logoutRouter.route('/')
    .post(logoutHandler)

module.exports = logoutRouter