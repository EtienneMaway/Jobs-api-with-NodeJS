const BadRequest = require("./bad-request");
const ConflictError = require("./confilct");
const CustomAPIError = require("./customError");
const ForbiddenError = require("./fobidden");
const InternalServer = require("./internal-server");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
    BadRequest,
    CustomAPIError,
    InternalServer,
    UnauthenticatedError,
    ForbiddenError,
    ConflictError
}