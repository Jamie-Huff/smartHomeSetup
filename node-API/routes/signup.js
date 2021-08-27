const express = require('express');
const router = express.Router();
const bcryp = require('bcrypt')




const singup = (db) => {
    router.get('/', (req, res) => {
        res.json(db)
    })
    router.post("/", (req, res) => {
        const name = req.body.name
        const email = req.body.email
        const password = bcryp.hashSync(req.body.password, 10)
        db.query("INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *;", [name, email, password])
        .then(data => {
            res.json("user registered")
        })
        .catch((err) => {
            if (err) {
                res.status(400).json({ error: "user already registered"})
            }
        })
    })
    return router
}




module.exports = singup