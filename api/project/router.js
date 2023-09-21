const express = require('express')

const router = express.Router()

const Project = require('./model')

router.use("*", (req, res) => {
  res.json({ message: 'api is live', api: 'active' })
})

router.use((err, req, res, next) => {
  res.status(500).json({
    custom: 'project-router error occurred',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router