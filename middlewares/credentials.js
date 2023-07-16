const allowedOrigin = require("../config/allowed-origin");

const credentials = (req, res, next) => {
    const origin = req.headers.origin
    if(allowedOrigin.includes(origin)){
        res.send('Access-Allow-Control-Credentials', true)
    }
    next()
}

module.exports = credentials