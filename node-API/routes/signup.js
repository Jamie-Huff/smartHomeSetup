const express = require('express');
const router = express.Router();
const bcryp = require('bcrypt')




const signup = (db) => {
    // just to confirm the route is working

    router.get('/', (req, res) => {
        res.json(db)
    })
    router.post("/", (req, res) => {

        const name = req.body.name
        console.log("this is name: ", name)
        const email = req.body.email
        console.log("this is email: ",email)
        // hashing the password in the DB
        const password = bcryp.hashSync(req.body.password, 10)
        console.log("this is the hashed password: ", password)
        db.query("INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *;", [name, email, password])
        .then(data => {
            res.json("User Registered")
        })
        .catch((err) => {
            // if there is any error sent this message to the front-end
            if (err) {
                res.status(400).json({ error: "Something went wrong"})
            }
        })
    })
    return router;
}




module.exports = signup