const express = require('express');
const { Router } = require('express');
const router = Router()

const sendProductInStore = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM has_product_store;`)
    .then(data => {
      res.send(data.rows)
    })
  })
  return router

}


module.exports = sendProductInStore