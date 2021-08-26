import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  useEffect(() => {
    axios.get('http://localhost:3002/dogs').then(res => {
      console.log(res.data);
    })
  }, [])

  return (
    <div className="App">
      <h1>SmartHome</h1>
    </div>
  );
}

export default App;