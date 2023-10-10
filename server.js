const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./app/routes/index')
const { successResponse, failureResponse } = require('./app/response/response')
require('dotenv').config()

const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/user', userRouter)

app.get('/', (req, res) => {
  try {
    return successResponse(res, 200, [], 'Rest Api working!')
  } catch (err) {
    return failureResponse(res, 400, JSON.stringify(err))
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
