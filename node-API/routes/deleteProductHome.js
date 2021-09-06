const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")
const getUserFromToken = require('../helpers/getUserFromToken')
const removeDuplicates = require('../helpers/removeDuplicates')
const roomObjMaker = require('../helpers/roomObjMaker');
const roomArrayFinder = require('../helpers/roomArrayFinder')
const compare = require('../helpers/objSorter')

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

    let products = (await db.query(`SELECT * FROM recommendations WHERE user_id = $1 AND survey_id = $2`, [userId, mostRecentSurvey.id])).rows
    let productList = []
    let unfilteredProducts = []
    for (const product of products) {
      let p = (await db.query(`SELECT * FROM products WHERE id = $1`, [product.product_id])).rows
      productList.push(p[0])
      unfilteredProducts.push(p[0])
    }
    
    productList = removeDuplicates(productList)

    for (const product of productList) {
      if (product.id === query.product_id) {
        product.in_home = false
      }
    } 

    let rooms = await roomArrayFinder(unfilteredProducts)
    rooms = await roomObjMaker(rooms, unfilteredProducts, db)
    rooms = rooms.sort(compare)

    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].name === 'inspecific') {
        rooms.unshift(rooms[i])
        rooms.splice(i + 1, 1)
        break
      }
    }

    let survey = [{id: mostRecentSurvey.id, user_id: userId, products: productList, rooms: rooms}]
    res.json(survey)
  })

  return router
}


module.exports = deleteProductHome