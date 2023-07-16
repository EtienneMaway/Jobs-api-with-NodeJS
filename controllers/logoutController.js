const { CustomAPIError } = require("../errors")
const Users = require('../models/users')


const logoutHandler = async (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt){
        throw new CustomAPIError('No content found', 204)
    }

    const refreshToken = cookies.jwt

    const foundUser = await Users.findOne({ refreshToken })
    if(!foundUser){
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            // secure: true
        })
        res.sendStatus(204)
    }

    foundUser.refreshToken = '';
    await foundUser.save()


    res.clearCookie('jwt',{
        httpOnly: true,
        sameSite: 'None',
        secure: true
    })
    res.sendStatus(204)
}

module.exports = logoutHandler