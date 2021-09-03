const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")


const surveyData = (db) => {

  router.post("/", async (req, res) => {
    let query = req.body
    let roomQuery = []
    let categoryQuery = []
    let categories = categoryFinder(query)
    let finalRecommendations = []
    let finalObj = { 
      id: null,
      user_id: null,
      rooms: [],
      products: [],
      totalPrice: query.budget
    }
    let finalArray = []

    jwt.verify(query.user.token, process.env.TOKEN, function(error, decoded) {
      finalObj.user_id = decoded.email
    })

    let userId = (await db.query(`SELECT * FROM users WHERE email = '${finalObj.user_id}'`
    )).rows[0].id
    finalObj.user_id = userId

    for (const room of query.rooms) {
      roomQuery.push(`rooms.name = '${room}'`)
    }

    for (const category in categories) {
      categoryQuery.push(`categories.name = '${categories[category].name}'`)
    }

    // get all products that match the room or category requested
    let productsRoomAndCategories = (await db.query(`SELECT products.* 
                    FROM products 
                    WHERE products.room_id 
                    IN (SELECT DISTINCT rooms.id FROM rooms WHERE ${roomQuery.join(' OR ')}) 
                    AND products.category_id
                    IN (SELECT DISTINCT categories.id FROM categories WHERE ${categoryQuery.join(' OR ')})
                    ORDER BY products.price`
      )).rows

    let productsRoomOrCategories = (await db.query(`SELECT products.* 
                    FROM products 
                    WHERE products.room_id 
                    IN (SELECT DISTINCT rooms.id FROM rooms WHERE ${roomQuery.join(' OR ')}) 
                    OR products.category_id
                    IN (SELECT DISTINCT categories.id FROM categories WHERE ${categoryQuery.join(' OR ')})
                    ORDER BY products.price`
        )).rows
    let inspecificProducts = (await db.query(`
                    SELECT * 
                    FROM products
                    WHERE room_id = 1`
        )).rows

    finalRecommendations = await generateRecommendations(productsRoomAndCategories, productsRoomOrCategories, inspecificProducts, query.budget, db)

    finalObj.products = finalRecommendations

    const finalObjRooms = async (rooms, products) => {
      // ERROR To fix : Dont send rooms with a product price of zero

      const roomFinal = []

      for (let room of rooms) {
        // fix these asap
        if (room === 'laundryroom') {
          room = 'laundry room'
        }
        if (room === 'entryway') {
          room = 'entrance way'
        }
        let roomObj = {name: room, id: null, cost: 0}
        let roomDetails = (await db.query(`SELECT * FROM rooms WHERE name = $1`, [room])).rows[0]
        roomObj.id = roomDetails.id
        for (const product of products) {
          if (product.room_id === roomObj.id) {
             roomObj.cost += product.price
          }
        }
        if (roomObj.cost > 0) {
          roomFinal.push(roomObj)
        }

      }
      return roomFinal
    }

    let roomsFinalArray = await finalObjRooms(query.rooms, finalRecommendations)
    finalObj.rooms = roomsFinalArray

  
    const addSurvey = (await db.query(
      `INSERT INTO survey_results (user_id, budget) VALUES($1, $2) RETURNING *`,
      [finalObj.user_id, query.budget]
      )).rows[0]
    surveyValues = addSurvey

    for (const product of finalRecommendations) {
      (await db.query(`INSERT INTO recommendations (user_id, survey_id, product_id) VALUES($1, $2, $3)`,
      [finalObj.user_id, surveyValues.id, product.id]))
    }

    finalObj.id = surveyValues.id
    finalArray.push(finalObj)
    res.json(finalArray)
    })
  return router;
}




module.exports = surveyData