import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Budget from './Budget';
import Provider from './Provider';
import Rooms from './Rooms';
import Categories from './Categories';
import Loading from './Loading';
import Error from './Error';
import dataOrganisers from '../../helpers/dataOrganisers'

import transitions from '@material-ui/core/styles/transitions';


const useStyles = makeStyles((theme) => ({
  buttonRec: {
    color:"#00b7eb",
    marginTop:"10px",
    fontWeight:"bold"
  },
  buttonSurvey: {
    color:"#00b7eb",
    marginTop:"40px",
    fontWeight:"bold",
    width: "300px"
  }
}));

export default function Form(props) {
  const classes = useStyles();
  
  const { save, mode, backToStart } = props;
  const { setupCategories, setUpRooms, formDataForSurvey, checkForUser } = dataOrganisers

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
    const surveyCategories = setupCategories(categories, quantities);
    const surveyRooms = setUpRooms(rooms);
    const surveyUser = checkForUser();

    if(surveyUser) {
      const surveyData = formDataForSurvey(budget, provider, surveyCategories, surveyRooms, surveyUser);
      save(surveyData)
    } else {
      const surveyDataAnon = formDataForSurvey(budget, provider, surveyCategories, surveyRooms);
      save(surveyDataAnon)
    }   
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
          <Button className={classes.buttonRec} 
            variant="outlined" 
            color="primary"
            onClick={handleSubmit}
          >
            GET RECOMMENDATIONS
          </Button>
        </div>
      } 
      {(mode === "LOADING") && <Loading/>}
      {(mode === "ERROR_NO_BUDGET") && 
        <div className="survey__create-flexColumn">
          <Error/>
          <Button className={classes.buttonSurvey} 
            variant="outlined" 
            color="secondary"
            onClick={backToStart}
          >
            GO BACK TO SURVEY
          </Button>
        </div>      
      }

    </React.Fragment>
    
  )
}