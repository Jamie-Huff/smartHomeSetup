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
    
    // get all products that match the room or category requested
    let filteredProducts = (await db.query(`SELECT products.* 
                    FROM products 
                    WHERE products.room_id 
                    IN (SELECT DISTINCT rooms.id FROM rooms WHERE ${roomQuery.join(' OR ')}) 
                    AND products.category_id
                    IN (SELECT DISTINCT categories.id FROM categories WHERE ${categoryQuery.join(' OR ')})
                    ORDER BY products.price`
      )).rows
    if (filteredProducts <= 4) {
      filteredProducts = (await db.query(`SELECT products.* 
                    FROM products 
                    WHERE products.room_id 
                    IN (SELECT DISTINCT rooms.id FROM rooms WHERE ${roomQuery.join(' OR ')}) 
                    OR products.category_id
                    IN (SELECT DISTINCT categories.id FROM categories WHERE ${categoryQuery.join(' OR ')})
                    ORDER BY products.price`
        )).rows
      }
    console.log(filteredProducts)
    res.send(filteredProducts)
    })

    let data = 'dogs'
    // let users = (await db.query(`SELECT * FROM users;`)).rows
    // await keyword essentially stops the code and completes the line before continuning one
    // data = await db.query(`SELECT * FROM users;`)
    // let users = data.rows

return router;
}


module.exports = surveyData