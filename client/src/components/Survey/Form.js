import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Budget from './Budget';
import Provider from './Provider';
import Rooms from './Rooms';
import Categories from './Categories';

//Form
export default function Form(props) {
  const { save, mode } = props;
  const [userResponse, setUserResponse] = useState({
		budget: "",
		provider: "",
		categories: {},
		rooms: [],	
	})

  const handleSubmit = (e) => {
		e.preventDefault();
    console.log("Time to save")
    // save(budget, provider, categories, rooms)
	}
 
  return(
    <React.Fragment>
      {(mode === "BUDGET") && <Budget userResponse={setUserResponse}/>}
      {(mode === "PROVIDER") && <Provider userResponse={setUserResponse}/>} 
      {(mode === "ROOMS") && <Rooms userResponse={setUserResponse}/>} 
      {(mode === "CATEGORIES") && <Categories save={handleSubmit} userResponse={setUserResponse}/>} 
    </React.Fragment>
    
  )
}