const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")

const deleteProductHome = (db) => {
  router.post("/", async (req, res) => {

    console.log("I GOT THE MESSAGE TO DELETE PROD FROM HOME", req.body)
    let query = req.body
    let email = ''

    jwt.verify(query.user.token, process.env.TOKEN, function(error, decoded) {
      email = decoded.email
    })
    // find the user by their email
    let userId = (await db.query(`SELECT * FROM users WHERE email = $1`, [email]
    )).rows[0].id
    // remove a row from the has_product_home table 
      // this means that a user removed that product from their home

    let findSurvey = (await db.query(`SELECT * FROM survey_results WHERE user_id = $1`, [userId])).rows

      // need the last survey in the database for that user, should be the most recent

    let mostRecentSurvey = await findSurvey[findSurvey.length - 1]

    const addToHome = async (productId, userId, surveyId) => {
      return (await db.query(`DELETE FROM has_product_home WHERE user_id = $2 AND product_id = $1 AND survey_id = $3`,
      [productId, userId, surveyId]))
    }
  
      addToHome(query.product_id, userId, mostRecentSurvey.id)

      res.json('Product sucessfully remove from home')
  })

  return router
}


module.exports = deleteProductHome