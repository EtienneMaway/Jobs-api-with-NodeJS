const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BadRequest, UnauthenticatedError } = require('../errors')

const loginHandler = async (req, res) => {
    const { username, password } = req.body
    if(!username || !password){
        throw new BadRequest("username and password required")
    }

    const foundUser = await Users.findOne({ username }).exec()
    if(!foundUser){
        throw new UnauthenticatedError("unauthorised user")
    }
        
    const match = await bcrypt.compare(password, foundUser.password)

    if(match){
        const accessToken = jwt.sign(
            {
                "username": foundUser.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {'expiresIn': '1h'}
        )
        console.log(accessToken)

        const refreshToken = jwt.sign(
            {
                "username": foundUser.username
            },
            process.env.REFRESH_TOKEN_SECRET,
            {'expiresIn': '1d'}
        )

        //saving refreshToken
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()

        console.log(result)

        // Sending Cookies to the client
        res.cookie('jwt',
            refreshToken,
            {
                httpOnly: true,
                sameSite: 'None',
                // secure: true,
                maxAge: 24 * 60 * 60 * 1000
            }
        )

        
        res.json({ accessToken })
    
    }else{
        res.status(401).json({ error: 'Invalid' });
    }
}

module.exports = { loginHandler }