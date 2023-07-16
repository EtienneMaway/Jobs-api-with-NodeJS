const { ForbiddenError } = require("../errors")
const CustomAPIError = require("../errors/customError")
const jwt = require('jsonwebtoken')
require('dotenv').config()


const jwtVerify =  (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('unauthorized user', 401)
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err){
                throw new ForbiddenError('Invalid Token')
            }else{
                req.user = { username: decoded.username}
            }
            next()
        }
    )

}

module.exports = jwtVerify