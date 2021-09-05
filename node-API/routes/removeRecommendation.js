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

const removeRecommendation = (db) => {
  router.post("/", async (req, res) => {
    let query = req.body
    let userId = await getUserFromToken(query.user, db)
    let findSurvey = (await db.query(`SELECT * FROM survey_results WHERE user_id = $1`, [userId])).rows

    let mostRecentSurvey = await findSurvey[findSurvey.length - 1]

    await db.query(`DELETE FROM recommendations WHERE user_id = $2 AND product_id = $1 AND survey_id = $3`,
      [query.product_id, userId, mostRecentSurvey.id])

    let findProducts = (await db.query(`SELECT * FROM recommendations WHERE user_id = $1 AND survey_id = $2`, [userId, mostRecentSurvey.id])).rows
    let productIds = findProducts
    let productList = []
    for (const product of productIds) {
      let productQuery = (await db.query(`SELECT * FROM products WHERE id = $1`, [product.product_id])).rows[0]
      productList.push(productQuery)
    }

    let roomsIds = roomArrayFinder(productList)
    let roomsFinal = await roomObjMaker(roomsIds, productList, db)
    
    roomsFinal.sort(compare);
    res.json(roomsFinal)
  })

  return router
}


module.exports = removeRecommendation