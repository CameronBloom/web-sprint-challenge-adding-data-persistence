// database wrapper
const database = require('../../data/dbConfig')

const checkProjectId = async (req, res, next) => {
  const { project_id } = req.body
  try {
    const existing = await database('projects').where('project_id', project_id).first()
    if (!existing) {
      next({ status: 404, message: `project with project_id ${project_id} not found`})
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

const validateTask = (req, res, next) => {
  try {
    const { task_description } = req.body
    if (
      task_description === undefined || 
      typeof(task_description) !== "string" ||
      !task_description.trim()
    ) {
      next({ status: 400, message: `invalid task_description`})
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

module.exports = {
  checkProjectId,
  validateTask,
}