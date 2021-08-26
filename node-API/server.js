const PORT = 3002;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // cors require

const app = express();
app.use(cors()) // CORS middleware useage
app.use(morgan('dev'));

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