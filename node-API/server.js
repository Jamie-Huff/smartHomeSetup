require('dotenv').config()

const PORT = 3002;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // cors require
const ENV = process.env.ENV || "development";

// PG database client / connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

module.exports = { db }

const app = express();
app.use(cors()) // CORS middleware useage
app.use(morgan('dev'));
app.use(express.json())
// import functions
const signup = require('./routes/signup');
const login = require('./routes/login')

// db.query(`SELECT * FROM USERS;`)
//   .then(data => {
//     console.log(data)
//   })

db1 = {
    '1': {
        id: 1,
        name: "moe",
        email: "moe@email.com",
        password: "hashed"
    },
    "2":{
        id: "2",
        name: "jamie",
        email:"jamie@email.com",
        password: "hashed"
    },
    "3": {
        id: 3,
        name: "David",
        email: "David@email.com",
        password: "hashed"
    }
}

app.use("/signup", signup(db));
app.use("/login", login(db))

app.get('/', (req, res) => {
    db.query(`SELECT * FROM USERS;`)
        .then(data => {
        console.log(data.rows)
    })
    console.log('test string')
})




app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));