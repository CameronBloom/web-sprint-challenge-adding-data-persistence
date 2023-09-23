// database wrapper
const database = require('../../data/dbConfig')

function addProject(project) {
  return database('projects').insert(project)
    .then(([project_id]) => {
      return database('projects').where('project_id', project_id).first()
    })
    .then(project => {
      return {
        ...project,
        project_completed: Boolean(project.project_completed),
      }
    })
}

async function getProjects() {

  const projects = []
  const projectRows = await database('projects as p')
    .select(
      'p.project_id',
      'p.project_name',
      'p.project_description',
      'p.project_completed',
    )
    .orderBy(
      'p.project_id'
    )

  projectRows.forEach(project => {
    projects.push({
      project_id: project.project_id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_completed: Boolean(project.project_completed),
    })
  })

  return projects
}

module.exports = {
  addProject,
  getProjects,
}