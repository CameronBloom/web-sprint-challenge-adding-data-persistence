const validateResource = (req, res, next) => {
  try {
    const { resource_name } = req.body
    if (
      resource_name === undefined || 
      typeof(resource_name) !== "string" ||
      !resource_name.trim()
    ) {
      next({ status: 400, message: `invalid resource_name`})
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

module.exports = {
  validateResource,
}