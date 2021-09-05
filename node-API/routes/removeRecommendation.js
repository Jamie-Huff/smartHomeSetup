const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")

const removeRecommendation = (db) => {
  router.post("/", async (req, res) => {
    let query = req.body
    console.log('@@@@', query)
    let email = ''

    jwt.verify(query.user.token, process.env.TOKEN, function(error, decoded) {
      email = decoded.email
    })
    // find the user by their email
    let userId = (await db.query(`SELECT * FROM users WHERE email = $1`, [email]
    )).rows[0].id

    let findSurvey = (await db.query(`SELECT * FROM survey_results WHERE user_id = $1`, [userId])).rows

      // need the last survey in the database for that user, should be the most recent
    let mostRecentSurvey = await findSurvey[findSurvey.length - 1]
    // remove the recommendation
    await db.query(`DELETE FROM recommendations WHERE user_id = $2 AND product_id = $1 AND survey_id = $3`,
      [query.product_id, userId, mostRecentSurvey.id])
    // get a list of the remaining recommendations
    let findProducts = (await db.query(`SELECT * FROM recommendations WHERE user_id = $1 AND survey_id = $2`, [userId, mostRecentSurvey.id])).rows
    let productIds = findProducts
    let productList = []
    for (const product of productIds) {
      let productQuery = (await db.query(`SELECT * FROM products WHERE id = $1`, [product.product_id])).rows[0]
      productList.push(productQuery)
    }
    // get the id's for each room
    const roomArrayFinder = (products) => {
      let roomIdArray = []
      for (let product of products) {
        if (!roomIdArray.includes(product.room_id)) {
          roomIdArray.push(product.room_id)
        }
      }
      return roomIdArray
    }

    let roomsIds = roomArrayFinder(productList)

    // using the id's for each room get a list of all the rooms

    const roomObjMaker = async (rooms, products) => {
      let roomsArray = []
      for (const room of rooms) {
        let roomObj = {name: null, id: room, cost: 0}
        let roomDetails = (await db.query(`SELECT * FROM rooms WHERE id = $1`, [room])).rows[0]
        roomObj.name = await roomDetails.name

        for (const product of products) {
          if (product.room_id === room) {
            roomObj.cost += product.price
          }
        }
        roomsArray.push(roomObj)
      }
      return roomsArray
    }
    
    let roomsFinal = await roomObjMaker(roomsIds, productList)

    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const roomA = a.name.toUpperCase();
      const roomB = b.name.toUpperCase();
    
      let comparison = 0;
      if (roomA > roomB) {
        comparison = 1;
      } else if (roomA < roomB) {
        comparison = -1;
      }
      return comparison;
    }
    
    roomsFinal.sort(compare);

    console.log('@@@', roomsFinal)

      res.json(roomsFinal)
  })

  return router
}


module.exports = removeRecommendation