const express = require('express')
const registerRouter = express.Router()
const registerHandler = require('../controllers/registerController')

registerRouter.route('/').post(registerHandler.register)

module.exports = registerRouter