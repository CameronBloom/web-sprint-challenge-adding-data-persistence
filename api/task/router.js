const express = require('express')
const { checkProjectId, validateTask } = require('./middleware')

const router = express.Router()

const Task = require('./model')

// POST
router.post('/', checkProjectId, validateTask, (req, res, next) => {
  const task = req.body

  Task.addTask(task)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(next)
})


// GET
router.get('/', (req, res, next) => {
  Task.getTasks()
    .then(tasks => {
      res.status(200).json(tasks)
    })
    .catch(next)
})

router.use("*", (req, res) => {
  res.json({ message: 'api is live', api: 'active' })
})

router.use((err, req, res, next) => {
  res.status(500).json({
    custom: 'task-router error occurred',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router