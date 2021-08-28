const express = require('express');
const router = express.Router();
const bcryp = require('bcrypt')
const jwt = require('jsonwebtoken')




const login = (db) => {
    // making sure the route is working
    // router.get("/", (req, res) => {
    //     res.send("hello form login")
    // })

      router.post("/", (req, res) => {
        const email = req.body.email
        const password = req.body.password
        // fetch all the data about the user through their email
        db.query("SELECT * FROM users WHERE email = $1", [email])
        .then(date => {
            // check if the user exist or not if it's not the length of rows will be 0
            if (date.rows.length < 1) {
                res.status(400).json({error: "User Does Not Exist"})
            }
            // check if the password match with the exsisting password
            if (bcryp.compareSync(password, date.rows[0].password)) {
                // create a token for that user
                const token = jwt.sign({email}, ENV["TOKEN"])
                // send the token to the front-end
                res.json({ token })

            }
        })
    })

    return router;
}


module.exports = login