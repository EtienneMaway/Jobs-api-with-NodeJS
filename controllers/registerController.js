const { BadRequest, ConflictError } = require("../errors")
const { StatusCodes } = require('http-status-codes')
const Users = require('../models/users')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    const { username, password } = req.body
    if(!username || !password) {
        throw new BadRequest('please, provide a username and password')
    }
    
    const duplicate = await Users.findOne({ username }).exec()
    if(duplicate){
        throw new ConflictError('username already exists')
    }

    try{
        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = await Users.create({
            "username": username,
            "password": hashpassword
            }
        )

        console.log(newUser)

        return res.status(201).send({ "msg": "user created successfully" })
        
    }catch(err){
            res.status(500).json({msg: "Something went wrong, please try again later"})
    }

}


module.exports = { register }