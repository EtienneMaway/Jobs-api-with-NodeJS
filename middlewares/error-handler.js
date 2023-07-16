const { StatusCodes } = require("http-status-codes");

const errorhandlerMiddleware = (err, req, res, next) => {
    let customErr = {
        //setup to default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'something went wrong please try again later'
    }
    if(err.name === "CastError"){
        customErr.msg = `No item found with ID: ${err.values}`,
        customErr.statusCode = 400
    }
    if(err.name === 'ValidationError'){
        customErr.msg = Object.values(err.errors).map(item => item.message).join(',')
        customErr.statusCode = 400
    }
    if(err.code && err.code === 11000){
        // Duplication Error 
        customErr.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customErr.statusCode = 400
    }
    return res.status(customErr.statusCode).json({msg: customErr.msg})
   
}

module.exports = errorhandlerMiddleware