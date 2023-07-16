const express = require('express')
const { handleRefreshToken } = require('../controllers/refreshController')
const refreshRouter = express.Router()

refreshRouter.route('/').get(handleRefreshToken)


module.exports = refreshRouter