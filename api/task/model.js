// database wrapper
const database = require('../../data/dbConfig')

async function getTasks() {
    
  const tasks = []
  const taskRows = await database('tasks as t')
    .leftJoin('projects as p', 't.project_id', 'p.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      'p.project_name',
      'p.project_description',
    )
    .orderBy(
      't.task_id'
    )

    taskRows.forEach(task => {
      tasks.push({
        task_id: task.task_id,
        task_description: task.task_description,
        task_notes: task.task_notes,
        task_completed: Boolean(task.task_completed),
        project_name: task.project_name,
        project_description: task.project_description,
      })
    })

  return tasks
}

module.exports = {
  getTasks,
}