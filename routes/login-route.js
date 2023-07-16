const express = require('express')
const { loginHandler } = require('../controllers/authController')
const LoginRouter = express.Router()

LoginRouter.route('/')
.post(loginHandler)

module.exports = LoginRouter