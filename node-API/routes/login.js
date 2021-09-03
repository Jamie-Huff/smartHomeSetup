const express = require('express');
const router = express.Router();
const bcryp = require('bcrypt')
const jwt = require('jsonwebtoken')




const login = (db) => {
    // making sure the route is working
    router.get("/", (req, res) => {
        res.send("hello form login")
    })

      router.post("/", (req, res) => {
        const email = req.body.email
        const password = req.body.password
        console.log("POST HAPPENED")
        // fetch all the data about the user through their email
        db.query("SELECT * FROM users WHERE email = $1", [email])
        .then(data => {
           let userName;
           if (data.rows[0]) {
               userName = data.rows[0].name
           }
            // check if the user exist or not if it's not the length of rows will be 0
            if (data.rows.length < 1) {
                return res.status(401).json({error: "User Does Not Exist"})
            }
            // check if the password matches with the existing password
            if (bcryp.compareSync(password, data.rows[0].password)) {
                // create a token for that user
                const token = jwt.sign({email}, process.env.TOKEN)
                // send the token to the front-end
                return res.json({ token, user: userName })
            } else {
                console.log("this is else: ")
                return res.status(401).json({error: "Password is incorrect"})
            }
        })
    })

    return router;
}


module.exports = login