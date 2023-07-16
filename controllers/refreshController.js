require('dotenv').config()
const jwt = require('jsonwebtoken')
const Users = require('../models/users')
 const { UnauthenticatedError, ForbiddenError, CustomAPIError } = require('../errors')


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt){
        throw new UnauthenticatedError('unauthorized')
    }

    const refreshToken = cookies.jwt

    const foundUser = await Users.findOne({ refreshToken }).exec()
    if(!foundUser){
        throw new CustomAPIError('Invalid token', 409)
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) {
                throw new ForbiddenError('forbidden')
            }

            const accessToken = jwt.sign(
                {
                    "username": decoded.username,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '50s'}
                
            )
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }


