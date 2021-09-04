const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")

const removeRecommendation = (db) => {
  router.post("/", async (req, res) => {
<<<<<<< HEAD
    console.log("**IN POST FOR DELETE REC**", req.body)
    res.send("REMOVED")
=======
    let query = req.body
    let email = ''

    jwt.verify(query.user.token, process.env.TOKEN, function(error, decoded) {
      email = decoded.email
    })
    // find the user by their email
    let userId = (await db.query(`SELECT * FROM users WHERE email = $1`, [email]
    )).rows[0].id

    let findSurvey = (await db.query(`SELECT * FROM survey_results WHERE user_id = $1`, [userId])).rows

      // need the last survey in the database for that user, should be the most recent

    let mostRecentSurvey = findSurvey[findSurvey.length - 1]

    (await db.query(`DELETE FROM recommendations WHERE user_id = $2 AND product_id = $1 AND survey_id = $3`,
      [query.product_id, userId, mostRecentSurvey.id]))

      res.json('Product sucessfully remove from recommendations')
>>>>>>> master
  })

  return router
}


module.exports = removeRecommendation