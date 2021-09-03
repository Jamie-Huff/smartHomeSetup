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
      const roomFinal = []
      // currently rooms in an array of rooms
      // we need too ->
        // loop through the rooms, | done
        // we need to use the products, to check their room id,
          // then add up the price for all the products in the room
        // finnaly send the array of objects to the front end inside the rooms of finalobj

      for (const room of rooms) {
        console.log('@@@', rooms)
        // room is a string
        let roomObj = {name: room, id: null, totalPrice: 0}
        let roomDetails = (await db.query(`SELECT * FROM rooms WHERE name = $1`, [room])).rows[0]
        roomObj.id = roomDetails.id
        for (const product of products) {
          if (product.room_id === roomObj.id) {
             console.log('room match :o')
             roomObj.totalPrice += product.price
          }
        }
        roomFinal.push(roomObj)

      }
      console.log(roomFinal)
      return roomFinal
      
    }

    console.log('@@@@@', finalObjRooms(query.rooms, finalRecommendations))
    // to do
      // rooms [ {cost, name, id} ]
      // finalobj.rooms to be an array of objects, which contains:\
        // the cost for the room
        // the room name
        // room id


  
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

      // finish the recommedations table



    // add returning to get back a specific value
    // RETURNING *


    // let users = (await db.query(`SELECT * FROM users;`)).rows
    // await keyword essentially stops the code and completes the line before continuning one
    // data = await db.query(`SELECT * FROM users;`)
    // let users = data.rows

  return router;
}


module.exports = surveyData