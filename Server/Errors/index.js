const CustomAPIError = require('./custom-api')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')
const InternalServerError = require('./internal-server-error')
const ForbiddenError = require('./forbiddenError')

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ForbiddenError,
}