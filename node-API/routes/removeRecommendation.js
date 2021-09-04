const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")

const removeRecommendation = (db) => {
  router.post("/", async (req, res) => {
    console.log("**IN POST FOR DELETE REC**", req.body)
    res.send("REMOVED")
  })

  return router
}


module.exports = removeRecommendation