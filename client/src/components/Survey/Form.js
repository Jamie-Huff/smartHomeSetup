import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Budget from './Budget';
import Provider from './Provider';
import Rooms from './Rooms';

export default function Form(props) {
  const { save, mode } = props;
  const [userResponse, setUserResponse] = useState({
		budget: "",
		provider: "",
		categories: {},
		rooms: [],	
	})

  //the forms stuff
  const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target.value)
	}

  return(
    <React.Fragment>
      {(mode === "BUDGET") && <Budget/>}
      {(mode === "PROVIDER") && <Provider/>} 
      {(mode === "ROOMS") && <Rooms/>}   
    </React.Fragment>
    
  )
}