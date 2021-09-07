// const db = require('../server')
const categoryFinder = require('./survey')

const generateRecommendations = async (roomAndCategory, roomOrCategory, inspecifics, budget, db, provider, query) => {

  let categories = query.categories
  let includedCategorys = []
  let recommendations = []
  let balanceRemaining = budget

  // start by looping through the products that match both are room and category
  for (const product of roomAndCategory) {
    if (budget < 3000 && product.category_id === 8 || budget < 1700 && product.category_id === 9 || budget < 3000 && product.category_id === 10) {
      continue
    }
    if (!includedCategorys.includes(product.category_id)) {
      if (balanceRemaining - (product.price / 100) >= 0) {
      includedCategorys.push(product.category_id)
      recommendations.push(product)
      balanceRemaining -= (product.price / 100)
      }
    }
  }
  // if after looping through the room and category, we dont have any products that match our needs, 
    // start going over the room OR category products
  if (recommendations.length === 0) {
    for (const product of roomOrCategory) {
      // the user cant afford a certain product, without taking all of their budget, skip it
      // additionally, since lights and speakers are handled later on, skip them for now aswell
        // unless a user only wants one of them
      if (budget < 3000 && product.category_id === 8 || budget < 1700 && product.category_id === 9 || budget < 3000 && product.category_id === 10 || product.category_id === 2 && categories['lights'].quantity > 1 || product.category_id === 3 && categories['lights'].quantity > 1 || product.category_id === 16 && categories['speakers'].quantity > 1|| product.category_id === 1 && categories['hubs'].quantity > 1) {
        continue
      }
      if (!includedCategorys.includes(product.category_id)) {
        if (balanceRemaining - (product.price / 100) >= 0) {
        includedCategorys.push(product.category_id)
        recommendations.push(product)
        balanceRemaining -= (product.price / 100)
        }
      }
    }
  }
  //-------------------------------------------------------
  // this contains all of our categories that have the ability to be multiple
    // if a user wanted multiple of a product, we go through the array, checking for the cheapest product in that category
    // for the case of 'lights' we only check for interior lights
  for (const category in categories) {
    let categoryIds = ''
    if (category === 'lights') {
      categoryIds = '2'
    }
    if (category === 'speakers') {
      categoryIds = '16'
    }
    if (category === 'hubs') {
      categoryIds = '1'
    }
    // depending on how many products the user wanted, of a specific category, adds accordingly
    if (categories[category].quantity > 1) {
      for (let i = 0; i < categories[category].quantity; i++) {
        let product = (await db.query(`
                      SELECT * 
                      FROM products 
                      WHERE category_id = ${categoryIds} 
                      ORDER BY price 
                      LIMIT 1`)).rows[0]
        recommendations.push(product)
        balanceRemaining -= (product.price / 100)
        if (!includedCategorys.includes(product.category_id)) {
        includedCategorys.push(product.category_id)
        }
      }
    }
  }
  //----------------------------------------------------------


  let addHub = []
  let addSpeaker = []
  // this checks how much money we have left, and to make sure we dont already have speakers or a hub
  // if we have over 300$ remaining, we can afford to add speaker and hub
  if (balanceRemaining >= 300 && !includedCategorys.includes(1) && !includedCategorys.includes(16)) {
    addHub = (await db.query(`
                                    SELECT * 
                                    FROM products 
                                    WHERE category_id = 1 
                                    ORDER BY price 
                                    LIMIT 1`)).rows
    addSpeaker = (await db.query(`
                                    SELECT * 
                                    FROM products 
                                    WHERE category_id = 16 
                                    ORDER BY price 
                                    LIMIT 1`)).rows
    recommendations.push(addHub[0], addSpeaker[0])
    includedCategorys.push(addHub[0].category_id, addSpeaker[0].category_id)
    balanceRemaining -= (addHub[0].price / 100) + (addSpeaker[0].price / 100)
    // if they have under 300 but over 150 remaining add 2 speakers instead of a speaker and a hub                                
  } else if (balanceRemaining >= 150 && !includedCategorys.includes(16)) {
    addSpeaker = (await db.query(`
                                    SELECT * 
                                    FROM products 
                                    WHERE category_id = 16 
                                    ORDER BY price 
                                    LIMIT 1`)).rows
    recommendations.push(addSpeaker[0], addSpeaker[0])
    includedCategorys.push(addSpeaker[0].category_id)
    balanceRemaining -= (addSpeaker[0].price / 100) * 2
  }  
  // add random inspecific products if a user has over 400 dollars left
  if (balanceRemaining >= 400) {
    for (const product of inspecifics) { 
      // start by checking if they already have a product with this category_id
      if (!includedCategorys.includes(product.category_id)) {
        // next try to add a vacume
        if (product.category_id === 7 && balanceRemaining - (product.price / 100) > 0) {
          recommendations.push(product)
          includedCategorys.push(product.category_id)
          balanceRemaining -= (product.price / 100)
          // if we can afford a vaccume here we add it
          // after we add one, any additional vacumes will fail the inital if condition
            // after the vaccume, we try to add 4 light bulbs
        } else if (product.category_id === 2 && (product.price / 100) < 20 && balanceRemaining - (product.price / 100) > 0) {
          for (let i = 1; i <= 4; i++) { 
            if (!includedCategorys.includes(product.category_id)) {
              includedCategorys.push(product.category_id)
            }
            recommendations.push(product)
            balanceRemaining -= (product.price / 100)
          }
        }
      }
      if (balanceRemaining - (product.price / 100) > 200 && !includedCategorys.includes(product.category_id) && product.category_id !== 2) {
        recommendations.push(product)
        includedCategorys.push(product.category_id)
        balanceRemaining -= (product.price / 100)
      }
    }
  }

  
  // 1. query roomsAndCategories try to add the cheapest of each category 
    // 2. in the event no products => query roomsOrCategories
      // 3. query inspecifics
    // 2. in the event products => query inspecifcs
    // 3. go back there first table, try to buy best products
  console.log(balanceRemaining)

  return recommendations
}

module.exports = generateRecommendations