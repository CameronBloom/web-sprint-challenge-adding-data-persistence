const express = require("express")
const resourceRouter = require("./resource/router")

const server = express()

server.use(express.json())

server.use('/api/resources', resourceRouter)

server.use('*', (req, res, next) => {
  res.json({ message: 'catch all endpoint' })
})

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: `server error occurred: error ${err.status}`,
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server