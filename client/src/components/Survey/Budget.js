import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


export default function Budget(props) {  
  const { budget, setBudget } = props
  
	const handleBudgetChange = event => {
		setBudget(event.target.value)
	}

  return(
      <input
      className="survey__create-input text--semi-bold"
      name="budget"
      type="text"
	    value = {budget}
      placeholder="$"
			onChange={handleBudgetChange}
      autoComplete="off"
    />  
  )
}
