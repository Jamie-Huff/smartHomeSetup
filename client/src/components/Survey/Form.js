import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Budget from './Budget';
import Provider from './Provider';
import Rooms from './Rooms';
import Categories from './Categories';
import Loading from './Loading';
import Error from './Error';


const useStyles = makeStyles((theme) => ({
  button: {
    color:"#00b7eb",
    marginTop:"10px",
    fontWeight:"bold"
  }
}));

export default function Form(props) {
  const classes = useStyles()
  const { save, mode } = props;

  //hooks for tracking the state of each survey question response
  const [budget, setBudget] = useState("");
  const [provider, setProvider] = useState("");
  const [rooms, setRooms] = useState({
    livingRoom: false,
    kitchen: false,
    bathRoom: false,
    bedRoom: false,
    laundryRoom: false,
    entryWay: false,
    garage: false,
    yard: false
  });
  const [categories, setCategories] = useState({
    lights: false,
    speakers: false,
    hubs: false,
    appliances: false,
    thermostat: false,
    security: false,
    garage: false,
  });  
  const [quantities, setQuantities] = useState({
    lights:"",
    speakers:"",
    hubs:""
  });

  const handleSubmit = (e) => {
    console.log("Time to submit form")
    console.log("Budget is", budget)
    console.log("provider is", provider)
    console.log("rooms are", rooms)
    console.log("categories are", categories)
    console.log("quantities are", quantities)
    //VALIDATE
    //save
    save(budget, provider, rooms, categories, quantities)
  }
 
  return(
    <React.Fragment>
      {(mode === "BUDGET") && <Budget budget={budget} setBudget={setBudget}/>}
      {(mode === "PROVIDER") && <Provider provider={provider} setProvider={setProvider}/>} 
      {(mode === "ROOMS") && <Rooms rooms={rooms} setRooms={setRooms}/>} 
      {(mode === "CATEGORIES") &&
        <div className="survey__create-flexColumn"> 
          <Categories quantities={quantities} 
            categories={categories} 
            setQuantities={setQuantities} 
            setCategories={setCategories} 
            save={handleSubmit}
          />
          <Button className={classes.button} 
            variant="outlined" 
            color="primary"
            onClick={handleSubmit}
          >
            GET RECOMMENDATIONS
          </Button>
        </div>
      } 
      {(mode === "LOADING") && <Loading/>}
      {(mode === "ERROR") && <Error/>}

    </React.Fragment>
    
  )
}