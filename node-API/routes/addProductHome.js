const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")
const getUserFromToken = require('../helpers/getUserFromToken')

const addProductHome = (db) => {
  router.post("/", async (req, res) => {
    let query = req.body
    let userId = await getUserFromToken(query.user, db)
    let findSurvey = (await db.query(`SELECT * FROM survey_results WHERE user_id = $1`, [userId])).rows
    let mostRecentSurvey = await findSurvey[findSurvey.length - 1]

    const addToHome = async (productId, userId, surveyId) => {
      return (await db.query(`INSERT INTO has_product_home (product_id, user_id, survey_id) VALUES($1, $2, $3)`,
      [productId, userId, surveyId]))
    }

    addToHome(query.product_id, userId, mostRecentSurvey.id)
      res.json('Product sucessfully added to home')
  })

  return router
}


module.exports = addProductHome