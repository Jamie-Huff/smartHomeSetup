const express = require("express");
const router = express.Router();
const bcryp = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const signup = (db) => {
  // just to confirm the route is working

  router.get("/", (req, res) => {
    res.json(db);
  });

  router.post("/", (req, res) => {
      console.log("this is req.body",req.body)
    const name = req.body.name;
    const email = req.body.email;
    console.log('email = ', email)
    const phone_number = req.body.phone_number
    // hashing the password in the DB
    const password = bcryp.hashSync(req.body.password, 10);
console.log(name, email, phone_number, password)

    db.query(`SELECT * FROM users WHERE email = $1`, [email]).then((data) => {
        // console.log(data)
        console.log("this is data: ",data.rows)

        if (data.rows[0] && data.rows[0].email) {
        return res.status(401).json({ error: "Email already in use" });
      } else {

        db.query(
          `INSERT INTO users (name, email, password, phone_number) VALUES($1, $2, $3, $4) RETURNING *`,
          [name, email, password, phone_number]
        )
        .then((response) => {
          const token = jwt.sign({ email }, process.env.TOKEN);
          return res.json({ response: "User Registered", token });
        })
        .catch((err) => {
        // if there is any error sent this message to the front-end
        if (err) {
          console.log(err.message);
          return res.status(401).json({ error: "Something went wrong" });
          }
        });
      }
    });
  });

  return router;
};

module.exports = signup;
