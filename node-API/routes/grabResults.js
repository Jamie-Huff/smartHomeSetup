const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")
const roomObjMaker = require("../helpers/roomObjMaker")
const roomArrayFinder = require("../helpers/roomArrayFinder")
const compare = require("../helpers/objSorter")
const getUserFromToken = require('../helpers/getUserFromToken')
const removeDuplicates = require('../helpers/removeDuplicates');
const removeRecommendation = require('./removeRecommendation');

const grabResults = (db) => {
  router.post("/", async (req, res) => {
    let query = req.body
    let survey = [{}]

    if (!query.token) {
      return res.json('error')
    }

    let userId = await getUserFromToken(query, db)
    let findSurvey = (await db.query(`SELECT * FROM survey_results WHERE user_id = $1`, [userId])).rows
    let mostRecentSurvey = await findSurvey[findSurvey.length - 1]
    let findProducts = (await db.query(`SELECT * FROM recommendations WHERE user_id = $1 AND survey_id = $2`, [userId, mostRecentSurvey.id])).rows
    let productIds = findProducts

    let productList = []

    for (const product of productIds) {
      let productQuery = (await db.query(`SELECT * FROM products WHERE id = $1`, [product.product_id])).rows[0]
      productList.push(productQuery)
    }

    let filteredProducts = removeDuplicates(productList)



    let roomIds = roomArrayFinder(productList)
    let roomsFinal = await roomObjMaker(roomIds, productList, db)

    roomsFinal.sort(compare);

    // ensure that inspecific, if it exists, is always the first one in the array
    for (let i = 0; i < roomsFinal.length; i++) {
      if (roomsFinal[i].name === 'inspecific') {
        roomsFinal.unshift(roomsFinal[i])
        roomsFinal.splice(i + 1, 1)
        break
      }
    }

    survey[0].rooms = roomsFinal
    survey[0].user_id = await userId
    survey[0].id = mostRecentSurvey.id
    survey[0].products = filteredProducts


    res.json(survey)
  })
  return router;
}

module.exports = grabResults