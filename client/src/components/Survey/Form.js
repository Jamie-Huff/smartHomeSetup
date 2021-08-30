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
		rooms: [],
    categories: {}	
	})

  const handleBudgetChange = (response) => {
    setUserResponse({ ...userResponse, budget: response });
  }
  const handleProviderChange = (response) => {
    setUserResponse({ ...userResponse, provider: response });
  }

  const handleRoomsChange = (response) => {
    setUserResponse({ ...userResponse, rooms: response });
  }

  const handleCategoriesChange = (response) => {
    setUserResponse({ ...userResponse, categories: response });
  }

  const handleSubmit = () => {
    console.log(userResponse)
    // save(budget, provider, categories, rooms)
	}
 
  return(
    <React.Fragment>
      {(mode === "BUDGET") && <Budget budget= {userResponse.budget} setUserResponse={handleBudgetChange}/>}
      {(mode === "PROVIDER") && <Provider provider= {userResponse.provider} setUserResponse={handleProviderChange}/>} 
      {(mode === "ROOMS") && <Rooms rooms= {userResponse.rooms} setUserResponse={handleRoomsChange}/>} 
      {(mode === "CATEGORIES") && <Categories save={handleSubmit} categories={userResponse.categories} setUserResponse={handleCategoriesChange}/>} 
    </React.Fragment>
    
  )
}