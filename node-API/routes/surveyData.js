const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")
const compare = require("../helpers/objSorter")
const getUserFromToken = require('../helpers/getUserFromToken')
const removeDuplicates = require('../helpers/removeDuplicates')
const roomArrayFinder = require('../helpers/roomArrayFinder')
const roomObjMaker = require('../helpers/roomObjMaker')

const surveyData = (db) => {
  router.post("/", async (req, res) => {
    let query = req.body
    if (!query.user) {
      return null
    }
    let roomQuery = []
    let categoryQuery = []
    // if a user doesnt select any categories, we auto give them appliances, lights, and speakers
    if (JSON.stringify(query.categories) === '{}') {
      query.categories = {
        lights: {quantity: 4},
        speakers: {quantity: 2},
        appliances: {quantity: 1}
      }
    }
    if (query.rooms.length === 0) {
      query.rooms = ['common area', 'kitchen', 'entryway']
    }
    let categories = categoryFinder(query)
    let provider = query.provider
    let finalRecommendations = []
    let finalObj = {
      id: null,
      user_id: null,
      rooms: [],
      products: [],
      totalPrice: query.budget
    }
    let finalArray = []

    let userId = await getUserFromToken(query.user, db)
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

    finalRecommendations = await generateRecommendations(productsRoomAndCategories, productsRoomOrCategories, inspecificProducts, query.budget, db, provider, query)

    let rooms = roomArrayFinder(finalRecommendations)
    rooms = await roomObjMaker(rooms, finalRecommendations, db)
    let roomsFinalArray = rooms

    roomsFinalArray.sort(compare);

    finalObj.rooms = roomsFinalArray

    //---------------------------------------
    const addSurvey = (await db.query(
      `INSERT INTO survey_results (user_id, budget) VALUES($1, $2) RETURNING *`, [finalObj.user_id, query.budget]
      )).rows[0]

    surveyValues = addSurvey
    for (const product of finalRecommendations) {
      (await db.query(`INSERT INTO recommendations (user_id, survey_id, product_id) VALUES($1, $2, $3)`, [finalObj.user_id, surveyValues.id, product.id]))
    }
    
    finalRecommendations = removeDuplicates(finalRecommendations)

    finalObj.products = finalRecommendations
    finalObj.id = surveyValues.id
    finalArray.push(finalObj)

    for (let i = 0; i < finalArray[0].rooms.length; i++) {
      if (finalArray[0].rooms[i].name === 'inspecific') {
        finalArray[0].rooms.unshift(finalArray[0].rooms[i])
        finalArray[0].rooms.splice(i + 1, 1)
        break
      }
    }

    res.json(finalArray)
  })
  return router;
}


module.exports = surveyData