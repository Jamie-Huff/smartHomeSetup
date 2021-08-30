import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import "./index.scss";
import Form from "./Form.js"
import useVisualMode from "../../hooks/useVisualMode"

//Modes for the form to use for rendering
const BUDGET = "BUDGET";
const CATEGORIES = "CATEGORIES";
const ERROR = "ERROR";
const ROOMS = "ROOMS";
const PROVIDER = "PROVIDER";
const SAVING = "SAVING"

//style for the survey paper
const useStyles = makeStyles((theme) => ({
  paper: {
		position: 'absolute',
		width: 500,
		height:500,
  }
}));

export default function Survey (props) {
	const { submitSurvey } = props;
	const classes = useStyles()
	
	//hook for controlling form rendering
	const { mode, transition, back } = useVisualMode(BUDGET)

	const next = () => {
		if(mode === BUDGET) {
			transition(PROVIDER);
		} else if(mode === PROVIDER) {
			transition(ROOMS);
		} else if(mode === ROOMS) {
			transition(CATEGORIES);
		}
	}

	const goBack = () => {
		back();
	}
	//When user survey is validated by form, send to backend
	const save = (budget, provider, rooms, category) => {	
		transition(SAVING);

		submitSurvey(budget, provider, rooms, category)
			.then((res) => {
				console.log("Sucessfully saved")
			})
			.catch((err) =>{
				console.log(err);
				transition(ERROR, true);
			})
	}			
	return (
		<div  className={classes.paper} style ={{marginLeft:'20px'}}>
      <div className="survey__card survey__card--create">
				<section className="survey__card-nao_ask">
					<img src="images/nao_ask.png" alt="nao" className="survey__card-img"/>
				</section>
				<section className="survey__card-form">
					<Form onSubmit={save} mode={mode} />
				</section>			
    		<section className="survey__actions">
					<Button className = "survey__actions-button" variant="contained" color="default" onClick={goBack}>
						<ArrowBackIosIcon style={{fontSize:'small'}}/> Back 
      		</Button> 
					<Button className = "survey__actions-button" variant="contained" color="primary" onClick={next}>
						Next <ArrowForwardIosIcon style={{fontSize:'small'}}/>
      		</Button>  				   
    		</section>
			</div>
    </div>
	)
}
