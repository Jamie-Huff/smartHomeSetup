const express = require('express');
const router = express.Router();
const bcryp = require('bcrypt')



const login = (db) => {
    router.get("/", (req, res) => {
        res.send("hello form login")
    })

      router.post("/", (req, res) => {
        const email = req.body.email
        const password = req.body.password
        db.query("SELECT * FROM users WHERE email = $1", [email])
        .then(date => {
            // check if the
            if (date.rows.length < 1) {
                res.status(400).json({error: "User Does Not Exist"})
            }
            if (bcryp.compareSync(password, date.rows[0].password))
            return
        })
    })


}


module.exports = login