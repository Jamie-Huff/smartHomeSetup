const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")

const grabResults = (db) => {
  router.post("/", async (req, res) => {

    let email = ''
    let survey = [
      {
        id: null,
        user_id: null,
        rooms: [],
        products: null,
      }
    ]

    let query = req.body

    if (!query.token) {
      return res.json('error')
    }

    jwt.verify(query.token, process.env.TOKEN, function(error, decoded) {
      email = decoded.email
    })
    // find the user by their email
    let userId = (await db.query(`SELECT * FROM users WHERE email = $1`, [email]
    )).rows[0].id

    survey[0].user_id = await userId

    let findSurvey = (await db.query(`SELECT * FROM survey_results WHERE user_id = $1`, [userId])).rows

    let mostRecentSurvey = await findSurvey[findSurvey.length - 1]
    survey[0].id = mostRecentSurvey.id

    let findProducts = (await db.query(`SELECT * FROM recommendations WHERE user_id = $1 AND survey_id = $2`, [userId, mostRecentSurvey.id])).rows
    let productIds = findProducts

    let productList = []
    for (const product of productIds) {
      let productQuery = (await db.query(`SELECT * FROM products WHERE id = $1`, [product.product_id])).rows[0]
      productList.push(productQuery)
    }
    survey[0].products = productList

    //------------------------------------------- Find rooms
    // i need to find the room that the product belongs in, just based off of the id, first I need to generate the rooms array
    const roomArrayFinder = (products) => {
      let roomIdArray = []
      for (let product of products) {
        if (!roomIdArray.includes(product.room_id)) {
          roomIdArray.push(product.room_id)
        }
      }
      return roomIdArray
    }

    // roomIds contain the id of every room
    let roomIds = roomArrayFinder(productList)

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

    let roomsFinal = await roomObjMaker(roomIds, productList)

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

    survey[0].rooms = roomsFinal

    console.log("SURVEY IS NOW***", survey)
    res.json(survey)

  })
  return router;
}

module.exports = grabResults