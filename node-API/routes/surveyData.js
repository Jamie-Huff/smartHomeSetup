const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')


const surveyData = (db) => {

  router.post("/", async (req, res) => {
    //console.log("IN POST SURVEY", (req.body))
    let query = req.body
    let roomQuery = []
    let categoryQuery = []
    let categories = []
    for (const room of query.rooms) {
      roomQuery.push(`rooms.name = '${room}'`)
    }
    categories = categoryFinder(query)

    for (const category in categories) {
      categoryQuery.push(`categories.name = '${categories[category].name}'`)
    }
    let productsRoomOrCategories = []
    let filteredProducts = []
    // get all products that match the room or category requested
    let productsRoomAndCategories = (await db.query(`SELECT products.* 
                    FROM products 
                    WHERE products.room_id 
                    IN (SELECT DISTINCT rooms.id FROM rooms WHERE ${roomQuery.join(' OR ')}) 
                    AND products.category_id
                    IN (SELECT DISTINCT categories.id FROM categories WHERE ${categoryQuery.join(' OR ')})
                    ORDER BY products.price`
      )).rows
      filteredProducts = productsRoomAndCategories
    if (productsRoomAndCategories <= 4) {
      productsRoomOrCategories = (await db.query(`SELECT products.* 
                    FROM products 
                    WHERE products.room_id 
                    IN (SELECT DISTINCT rooms.id FROM rooms WHERE ${roomQuery.join(' OR ')}) 
                    OR products.category_id
                    IN (SELECT DISTINCT categories.id FROM categories WHERE ${categoryQuery.join(' OR ')})
                    ORDER BY products.price`
        )).rows
        filteredProducts = productsRoomOrCategories
      }
    let inspecificProducts = (await db.query(`
                    SELECT * 
                    FROM products
                    WHERE room_id = 1`
        )).rows
    // console.log(productsRoomAndCategories)
    // console.log(productsRoomOrCategories)

    const generateRecommendations = async (roomAndCategory, roomOrCategory, inspecifics, budget) => {
      // lets think about what I want to get done
        // first, go over all the roomAndCategory products adding a product for each category
        // next, if our roomAndCategory array is empty, we will go over our roomOrCategory function,
          // doing the same thing.
          // next we need to add either speakers or a hub depending on the client remaining budget

      let includedCategorys = []
      let recommendations = []
      let balanceRemaining = budget
      // adds the cheapest product from each category, to the recommendations,
      // however here are some issues
          // this doesnt account for the roomOrCategory table | Completed
          // doesn't apply the inspecifics table 
          // and doesn't increase in price as I loop
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
      if (recommendations.length === 0) {
        for (const product of roomOrCategory) {
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
      }
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
        balanceRemaining -= (addSpeaker[0].price / 100) * 2
      }  
      

      // 1. query roomsAndCategories try to add the cheapest of each category 
        // 2. in the event no products => query roomsOrCategories
          // 3. query inspecifics
        // 2. in the event products => query inspecifcs
        // 3. go back there first table, try to buy best products
      console.log(recommendations)
      console.log(balanceRemaining)
    }

    let finalRecommendations = generateRecommendations(productsRoomAndCategories, productsRoomOrCategories, inspecificProducts, query.budget)

    // console.log(inspecificProducts)
    res.json(finalRecommendations)
    })

    // let users = (await db.query(`SELECT * FROM users;`)).rows
    // await keyword essentially stops the code and completes the line before continuning one
    // data = await db.query(`SELECT * FROM users;`)
    // let users = data.rows

  return router;
}


module.exports = surveyData