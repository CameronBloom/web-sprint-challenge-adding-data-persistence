const validateProject = (req, res, next) => {
  try {
    const { project_name } = req.body
    if (
      project_name === undefined || 
      typeof(project_name) !== "string" ||
      !project_name.trim()
    ) {
      next({ status: 400, message: `invalid project_name`})
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

module.exports = {
  validateProject,
}