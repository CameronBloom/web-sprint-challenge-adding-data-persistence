// database wrapper
const database = require('../../data/dbConfig')

async function getResources() {
    
  const resources = []
  const resourceRows = await database('resources as r')
    .select(
      'r.resource_id',
      'r.resource_name',
      'r.resource_description',
    )
    .orderBy(
      'r.resource_id'
    )

  resourceRows.forEach(resource => {
    resources.push({
      resource_id: resource.resource_id,
      resource_name: resource.resource_name,
      resource_description: resource.resource_description,
    })
  })

  return resources

  // const recipeRows = await database('recipes as r')
  //   .leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
  //   .leftJoin('step_ingredients as si', 'si.step_id', 's.step_id')
  //   .leftJoin('ingredients i', 'i.ingredient_id', 'si.ingredient_id')
  //   .select(
  //     'r.recipe_id',
  //     'r.recipe_name',
  //     's.step_id',
  //     's.step_number',
  //     's.step_text',
  //     'i.ingredient_id',
  //     'i.ingredient_name',
  //     'si.quantity',
  //   )
  //   .orderBy('s.step_number')
  //   .where('r.recipe_id', recipe_id)

  // const recipes = {
  //   recipe_id: recipeRows[0].recipe_id,
  //   recipe_name: recipeRows[0].recipe_name,
  //   steps: recipeRows.reduce((acc, row) => {
  //     if(!row.ingredient_name) {
  //       return acc.concat({
  //         step_id: row.step_id,
  //         step_number: row.step_number,
  //         step_instructions: row.step_text,
  //         ingredients: []
  //       })
  //     }
  //     // if there's an ingredient and step not found...
  //     if (row.ingredient_id && !acc.find(step => step.step_id === row.step_id)) {
  //       return acc.concat({
  //         step_id: row.step_id,
  //         step_number: row.step_number,
  //         step_instructions: row.step_text,
  //         ingredients: [
  //           {
  //             ingredient_id: row.ingredient_id,
  //             ingredient_name: row.ingredient_name,
  //             quantity: row.quantity,
  //           }
  //         ]
  //       })
  //     }
  //     // 
  //     const currentStep = acc.find(step => step.step_id === row.step_id)
  //     currentStep.ingredients.push(            {
  //       ingredient_id: row.ingredient_id,
  //       ingredient_name: row.ingredient_name,
  //       quantity: row.quantity,
  //     })
  //     return acc
  //   }, [])
  // }
  // return recipes

}

module.exports = {
  getResources
}