const express = require('express');
const { Router } = require('express');
const router = Router()

const sendRooms = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM rooms;`)
    .then(data => {
      res.send(data.rows)
    })
  })
  return router
}


module.exports = sendRooms