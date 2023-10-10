const jwt = require('jsonwebtoken')
const { successResponse, failureResponse } = require('../response/response')
const httpStatus = require('http-status')

const secretKey = 'ananya-secret-key'
const user = {
  username: 'ananya',
  password: 'Ananya@123',
  session: null
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (username === user.username && password === user.password) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: '5h' })
      if (token) {
        user.session = token
        return successResponse(res, httpStatus.OK, user, 'User logged in successfully')
      }
      return failureResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'Error generating token')
    } else {
      return failureResponse(res, httpStatus.UNAUTHORIZED, 'Authentication failed')
    }
  } catch (error) {
    console.log(error)
    return failureResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'Authentication failed')
  }
}

exports.verifyAuthToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization
    if (!token) {
      return failureResponse(res, httpStatus.UNAUTHORIZED, 'MISSING_TOKEN')
    }
    token = token.replace(/^Bearer\s+/, '')

    jwt.verify(token, secretKey, async (error, decoded) => {
      if (error) {
        return failureResponse(res, httpStatus.UNAUTHORIZED, error.message)
      }

      const checkJwt = user.session === token
      if (!checkJwt) {
        return failureResponse(res, httpStatus.UNAUTHORIZED, 'INVALID_TOKEN')
      } else {
        return next()
      }
    })
  } catch (err) {
    console.log(err)
    return failureResponse(res, httpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR')
  }
}
