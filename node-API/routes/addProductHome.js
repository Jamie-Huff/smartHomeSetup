const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")

const addProductHome = (db) => {
  router.post("/", async (req, res) => {
    let query = req.body
    let email = ''
    //given a user id, and product id
      // res.body.user_id
      // res.body.product_id
    jwt.verify(query.user.token, process.env.TOKEN, function(error, decoded) {
      email = decoded.email
    })
    // find the user by their email
    let userId = (await db.query(`SELECT * FROM users WHERE email = $1`, [email]
    )).rows[0].id

    console.log('email', email)
    //need to find the users most recent survey, and add the product to it
    console.log('userid', userId)
    let findSurvey = (await db.query(`SELECT * FROM survey_results WHERE user_id = $1`, [userId])).rows

    // need the last survey in the database for that user, should be the most recent

    let mostRecentSurvey = await findSurvey[findSurvey.length - 1]
    console.log('most recent', mostRecentSurvey.id)

    //Inside of the has_product_home table
    //Add a row for the current product in the users home

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