const express = require('express');
const { db } = require('../server');
const router = express.Router();


const surveyData = (db) => {

  router.post("/", (req, res) => {
    //console.log("IN POST SURVEY", (req.body))
    let query = req.body
    let roomQuery = []
    let categoryQuery = []
    let categories = []
    for (const room of query.rooms) {
      roomQuery.push(`rooms.name = '${room}'`)
    }
    // this produces a query of all products, regardless of category, it just filters by room id
    // need to adjust this to filter by the category aswell.

    // for examples this will give us all products for the common area,
    // however, we only want products that match the common area, and are listed as one of our categories
    // this for loops makes the variable categories help adjust our product results

    for (const category in query.categories) {
      if (category === 'lights') {
        categories.push(
          {quantity: query.categories[category].quantity, name: 'interior lights', id: 2}, 
          {quantity: query.categories[category].quantity, name: 'yard lights', id: 3})
      }
      if (category === 'speakers') {
        categories.push(
          {quantity: query.categories[category].quantity, name: 'speakers', id: 16})
      }
      if (category === 'hubs') {
        categories.push(
          {quantity: query.categories[category].quantity, name: 'hubs', id: 1})
      }
      if (category === 'appliances') {
        categories.push(
          {quantity: query.categories[category].quantity, name: 'vaccumes', id: 7},
          {quantity: query.categories[category].quantity, name: 'refrigerators', id: 8},
          {quantity: query.categories[category].quantity, name: 'stoves', id: 9},
          {quantity: query.categories[category].quantity, name: 'dishwashers', id: 10},
          {quantity: query.categories[category].quantity, name: 'washers', id: 11},
          {quantity: query.categories[category].quantity, name: 'dryers', id: 12},
          {quantity: query.categories[category].quantity, name: 'coffee makers', id: 14},
          {quantity: query.categories[category].quantity, name: 'televisions', id: 17})
      }
      if (category === 'thermostat') {
        categories.push(
          {quantity: query.categories[category].quantity, name: 'thermostats', id: 13})
      }
      if (category === 'security') {
        categories.push(
          {quantity: query.categories[category].quantity, name: 'yard cameras', id: 4},
          {quantity: query.categories[category].quantity, name: 'interior camears', id: 5},
          {quantity: query.categories[category].quantity, name: 'door locks', id: 15},
          {quantity: query.categories[category].quantity, name: 'door bells', id: 6})
      }
      if (category === 'garage') {
        categories.push(
          {quantity: query.categories[category].quantity, name: 'garage door opener', id: 18})
      } 
    }

    for (const category in categories) {
      categoryQuery.push(`categories.name = '${categories[category].name}'`)
    }

    // db.query(`SELECT DISTINCT categories.id FROM categories WHERE ${categoryQuery.join(' OR ')}`)
    //   .then(data => {
    //     console.log('category query', data)
    //   }) 
    console.log(query.rooms)
    console.log(categories)

    // get all products that match the room or category requestedg
    db.query(`SELECT products.* 
    FROM products 
    WHERE products.room_id 
    IN (SELECT DISTINCT rooms.id FROM rooms WHERE ${roomQuery.join(' OR ')}) 
    AND products.category_id
    IN (SELECT DISTINCT categories.id FROM categories WHERE ${categoryQuery.join(' OR ')})
    ORDER BY products.price`)
      .then(data => {
        let filteredProducts = data.rows
        console.log(filteredProducts)
        res.json(filteredProducts)
        })
      .catch(err => {
        console.log(err)
      })
    })


return router;
}


module.exports = surveyData