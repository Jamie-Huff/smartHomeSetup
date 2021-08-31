const express = require('express');
const { Router } = require('express');
const router = Router()

const sendProducts = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM PRODUCTS;`)
    .then(data => {
      res.send(data.rows)
    })
  })
  return router
}


module.exports = sendProducts