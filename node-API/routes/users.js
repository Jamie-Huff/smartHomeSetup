const express = require('express');
const { Router } = require('express');
const router = Router()

const sendUsers = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM users;`)
    .then(data => {
      res.send(data.rows)
    })
  })
  return router

  // add post request for new users?
}


module.exports = sendUsers