const express = require('express')

const app = express()
const indexRouter = require('./src/routes/index')

require('dotenv').config

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', indexRouter)

module.exports = app
