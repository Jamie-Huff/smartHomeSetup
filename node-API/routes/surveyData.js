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
      rooms: query.rooms,
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
    console.log('!@#@!#!@', finalRecommendations)

    finalObj.products = finalRecommendations



    const addSurvey = (await db.query(
      `INSERT INTO survey_results (user_id, budget) VALUES($1, $2) RETURNING *`,
      [finalObj.user_id, query.budget]
      )).rows[0]
    surveyValues = addSurvey
    finalObj.id = surveyValues.id
    console.log('final', finalObj)
    finalArray.push(finalObj)
    res.json(finalArray)
    })
    // to do
      //[ {cost, name, id} ]
      // finalobj.rooms to be an array of objects, which contains:\
        // the cost for the room
        // the room name
        // room id
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