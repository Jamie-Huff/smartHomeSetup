require('dotenv').config()
const PORT = 3002;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // cors require
const ENV = process.env.ENV || "development";
// console.log(process.env.DB_HOST);

// PG database client / connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect()
  .catch(err => {
    console.error(err)
  })

module.exports = { db }

const app = express();
app.use(cors()) // CORS middleware useage
app.use(morgan('dev'));
app.use(express.json())
// import functions
const signup = require('./routes/signup');
const login = require('./routes/login')
const surveyData = require('./routes/surveyData')
const surveyDataAnon = require('./routes/surveyDataAnon')

const sendProducts = require('./routes/products')
const sendRooms = require('./routes/rooms')
const sendUsers = require('./routes/users')
const sendProductInStore = require('./routes/productInStore')

const grabResults = require('./routes/grabResults')
const deleteProductHome = require('./routes/deleteProductHome')
const addProductHome = require('./routes/addProductHome')
const removeRecommendation = require('./routes/removeRecommendation')

app.use("/signup", signup(db));
app.use("/login", login(db))
app.use("/surveyData", surveyData(db))
app.use("/surveyDataAnon", surveyDataAnon(db))
app.use("/products", sendProducts(db))
app.use("/rooms", sendRooms(db))
app.use("/users", sendUsers(db)) // security issue? lets talk about it
app.use("/productInStore", sendProductInStore(db))
app.use("/grabResults", grabResults(db))
app.use("/deleteProductHome", deleteProductHome(db))
app.use("/addProductHome", addProductHome(db))
app.use("/removeRecommendation", removeRecommendation(db))

// app.use("/signup", signup(db));
// app.use("/login", login(db))

app.get('/', (req, res) => {
  db.query(`SELECT * FROM PRODUCTS;`)
  .then(data => {
    console.log('#@#@', data.rows[0])
    res.send('unique string')
  })
  console.log('test string')
})




app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));