const PORT = 3002;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // cors require

const app = express();
app.use(cors()) // CORS middleware useage
app.use(morgan('dev'));
// import functions
const singup = require('./routes/signup');
const login = require('./routes/login')

db = {
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

app.use("/signup", singup(db));



const data = [
	{name: 'Waffle'},
	{name: 'Doug'},
	{name: 'Luna'},
	{name: 'MoonMoon'},
]
app.get('/', (req, res) => {
  res.send("Hello World")
  console.log('test string')
})

app.get('/dogs', (req, res) => {
  res.json(data);
})



app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));