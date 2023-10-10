const httpStatus = require('http-status')
const { failureResponse } = require('../response/response')

const reqValidator = (schema, source = 'body') => async (req, res, next) => {
  const data = req[source]
  try {
    const validatedValues = await schema.validate(data)
    if (validatedValues.error) {
      const { details } = validatedValues.error
      const message = details.map((i) => i.message).join(',')
      return failureResponse(res, httpStatus.BAD_REQUEST, message)
    }
    return next()
  } catch (err) {
    return failureResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR')
  }
}

module.exports = reqValidator
