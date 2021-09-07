const express = require('express');
const { db } = require('../server');
const router = express.Router();
const categoryFinder = require('../helpers/survey')
const jwt = require("jsonwebtoken");
const generateRecommendations = require("../helpers/productRecommendations")
const compare = require("../helpers/objSorter")
const getUserFromToken = require('../helpers/getUserFromToken')
const removeDuplicates = require('../helpers/removeDuplicates')

const surveyDataAnon = (db) => {
  router.post("/", async (req, res) => {
    console.log("AN ANON USER WANTS TO SEE RECS", req.body)
    const products = [
      {
        id: 1,
        room_id: 3,
        category_id: 2,
        name: "Phillips Hue of Life",
        description: "Amazing product Get A Copywriter. Native English speakers. Unlimited revisions. 100% money-back guarantee. Order now! 100% unique content by copywriters with local knowledge. Reviewed by senior editors. 100% money-back guarantee. Reliable delivery. Fast turnaround.",
        price: 20099,
        image:"images/hue.jpeg",
        quantity:2

      },
      {
        id: 2,
        room_id: 2,
        category_id: 16,
        name: "Sonos One",
        description: "Super Amazing product",
        price: 27599,
        image: "Another Lit Image",
        quantity:3
      },
      {
        id: 3,
        room_id: 2,
        category_id: 4,
        name: "Selection Camera",
        description: "Beyond Amazing product",
        price: 50099,
        image: "Just the very best image",
        quantity:1
      },
      {
        id: 4,
        room_id: 3,
        category_id: 6,
        name: "Door Bell",
        description: "Super Amayzung",
        price: 10000,
        image:"Lit Eyy Image",
        quantity:1
      },
      {
        id: 5,
        room_id: 4,
        category_id: 8,
        name: "Fridge",
        description: "Super Amayzliung",
        price: 22199,
        image:"Lit sheswut Image",
        quantity:1
      },
    ]

    const survey = [
      {
       id: 1,
       user_id: 2,
       rooms: [{id:3, name: "kitchen", cost: 20000 }, {id: 2, name: "bedroom", cost: 400099}, {id: 4, name: "common area", cost: 170000}],
       products: products,
     }
    ]
    console.log("@@@", survey)
    res.json(survey)
  })
  return router;
}


module.exports = surveyDataAnon