const jwt = require("jsonwebtoken");

const getUserFromToken = async (query, db) => {
  jwt.verify(query.token, process.env.TOKEN, function(error, decoded) {
    email = decoded.email
   })
  let userId = (await db.query(`SELECT * FROM users WHERE email = $1`, [email]
    )).rows[0].id
  return userId
}

module.exports = getUserFromToken