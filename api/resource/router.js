const express = require('express')
const { validateResource } = require('./middleware')

const router = express.Router()

const Resource = require('./model')

// POST
router.post('/', validateResource, (req, res, next) => {
  const resource = req.body

  Resource.addResource(resource)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(next)
})

// GET
router.get('/', (req, res, next) => {
  Resource.getResources()
    .then(resources => {
      res.status(200).json(resources)
    })
    .catch(next)
})

router.use("*", (req, res) => {
  res.json({ message: 'api is live', api: 'active' })
})

router.use((err, req, res, next) => {
  res.status(500).json({
    custom: 'resource-router error occurred',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router