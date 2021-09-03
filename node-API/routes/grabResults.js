const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")

const grabResults =  (db) => {
  router.get("/", async (req, res) => {

    // get the user token
    jwt.verify(query.user.token, process.env.TOKEN, function(error, decoded) {
      finalObj.user_id = decoded.email
    })
    // find the user by their email
    let userId = (await db.query(`SELECT * FROM users WHERE email = '${finalObj.user_id}'`
    )).rows[0].id
    finalObj.user_id = userId

    // using the user id, look through survey results for that user

    

    // select the survey with the most recent date



    // render the same format to the front end


  })
  return router;
}

module.exports = grabResults