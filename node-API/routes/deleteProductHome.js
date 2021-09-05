const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")
const getUserFromToken = require('../helpers/getUserFromToken')

const deleteProductHome = (db) => {
  router.post("/", async (req, res) => {
    let query = req.body
    let userId = await getUserFromToken(query.user, db)
    let findSurvey = (await db.query(`SELECT * FROM survey_results WHERE user_id = $1`, [userId])).rows
    let mostRecentSurvey = await findSurvey[findSurvey.length - 1]

    const deletefromHome = async (productId, userId, surveyId) => {
      return (await db.query(`DELETE FROM has_product_home WHERE user_id = $2 AND product_id = $1 AND survey_id = $3`,
      [productId, userId, surveyId]))
    }
  
    deletefromHome(query.product_id, userId, mostRecentSurvey.id)

    res.json('Product sucessfully remove from home')
  })

  return router
}


module.exports = deleteProductHome