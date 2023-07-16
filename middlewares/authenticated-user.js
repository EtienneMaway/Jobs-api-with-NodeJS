const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/unauthenticated');

const authenticateUser = (req, res, next) => {
  try {
    // Retrieve the access token from the request headers or cookies
    const accessToken = req.headers.authorization?.split(' ')[1] || req.cookies.jwt;

    if (!accessToken) {
      throw new UnauthenticatedError('Access token not found');
    }

    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Attach the user information to the request object
    req.user = { username: decoded.username };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateUser;