const express = require('express')
const errorHandler = require('./src/middlewares/errorHandler')

const app = express()
const indexRouter = require('./src/routes/index')

require('dotenv').config

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', indexRouter)
app.use(errorHandler)

module.exports = app
