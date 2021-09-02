import {useState, useEffect} from "react";
import axios from 'axios';


const products = [
  {
    id: 1,
    room_id: 3,
    category: "interior lights",
    name: "phillips hue",
    description: "Amazing product",
    price: 200,
    img:"Lit Image"
  },
  {
    id: 2,
    room_id: 2,
    category: "speakers",
    name: "sonos one",
    description: "Super Amazing product",
    price: 275,
    img: "Another Lit Image"
  },
  {
    id: 1,
    room_id: 1,
    category: "exterior camera",
    name: "Selection camera",
    description: "Beyond Amazing product",
    price: 500,
    img: "Just the very best image"
  },
]

const rooms = {
  "1": { id: 1, name: "Kitchen" },
  "2": { id: 2, name: "Common Area" },
  "3": { id: 3, name: "Bathroom" },
}

const surveys = {
  "1": {
    id: 1,
    user_id: 2,
    rooms: [{name: "kitchen", cost: 29909}, {name: "laundry room", cost: 400099}],
    products: products,
  },
  "2": {
    id: 2,
    user_id: 2,
    rooms: ["Common Area", "Bathroom"],
    products: ["phillips hue", "sonos one"],
    budget: 1500
  },
  "3": {
    id: 3,
    user_id: 2,
    rooms: ["kitchen", "Common Area"],
    products: ["phillips hue", "selection camera"],
    budget: 1500
  }
}

export default function useApplicationData () {
  const [products, setProducts] = useState([]);
  const [rooms, setRooms] = useState({});
  const [surveys, setSurveys] = useState({});

  const [recommendations, setRec] = useState([]);

  useEffect(() => {
    //Load all the data from the database when the page loads
    Promise.all([
      axios.get('http://localhost:3002/products'),
      axios.get('http://localhost:3002/rooms'),
      // axios.get('/survey')
    ]).then((all) => {
      setProducts(all[0].data);
      console.log("this is form useapp",products)
      setRooms(all[1].data);
      // setSurveys(all[2].data);
    });
  },[])

  const submitSurvey = (surveyData) => {

    console.log("IN SUBMIT SURVEY", surveyData)

    // send data to the backend
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:3002/surveyData", surveyData)
      .then((res) => {
        // const survey = {
        // }
        // setState({
        //   // ...state,
        //   // survey
        // })
        console.log("GOT BACK A MESSAGE")
        console.log("MESSAGE IS", res)
        setRec(res.data);
        return resolve(res);
      })
      .catch((err) => {
        return reject(console.log(err.message))
      })
    })
  }

  //Delete the appointment from the db, then update the state of the app
  const editRecommendations = (id) => {
    console.log("IN EDIT RECOMMENDATIONS")
    // return new Promise((resolve, reject) => {
    //   axios.post()
    //   .then((res) => {
    //     const recommendations = {
    //     }
    //     setState({
    //       ...state,
    //       recommendations
    //     })
    //     return resolve(console.log(res));
    //   })
    //   .catch((err) => {
    //     return reject(console.log(err.message));
    //   })
    // })
  }

  const switchSurvey = (id) => {
      console.log("IN SWITCH SURVEY")

    // return new Promise((resolve, reject) => {
    //   axios.post()
    //   .then((res) => {
    //     const survey = {
    //     }
    //     setState({
    //       ...state,
    //       survey
    //     })
    //     return resolve(console.log(res));
    //   })
    //   .catch((err) => {
    //     return reject(console.log(err.message));
    //   })
    // })
  }

  return {
    products,
    rooms,
    surveys,
    recommendations,
    submitSurvey,
    editRecommendations,
    switchSurvey
  }
}