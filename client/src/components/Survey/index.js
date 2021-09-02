import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
const LOADING = "LOADING"

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

	const classes = useStyles();
	let history = useHistory();

	//call custom hook for controlling form rendering
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

	const backToStart = () => {
		transition(BUDGET);
	}
	//Send survery results to the backend
	const save = (surveyData) => {	
		transition(LOADING);		

		setTimeout(() => {
			submitSurvey(surveyData)
				.then((res) => {
					console.log("WITHIN INDEX FRONT END",res)
					history.push("/");
				})
				.catch((err) =>{
					console.log(err);
					transition(ERROR, true);
				})
			}, 1000);
	}			
	return (
		<div  className={classes.paper} style ={{marginLeft:'20px'}}>
      <div className="survey__card survey__card--create">
				{/* Dont load nao top pic ic its loading or displaying an error message */}
				{ (mode!== "LOADING" && mode!= "ERROR") && 
					<section className="survey__card-nao_ask">
						<img src="images/nao_ask.png" alt="nao" className="survey__card-img"/>
					</section>
				}
				<section className="survey__card-form">
					<Form save={save} mode={mode} backToStart={backToStart}/>
				</section>			
    		<section className="survey__actions">
					{(mode !== "BUDGET" && mode !== "LOADING" && mode != "ERROR") &&
						<Button className = "survey__actions-button" variant="contained" color="default" onClick={goBack}>
							<ArrowBackIosIcon style={{fontSize:'small'}}/> Back 
      			</Button> 
					}
					{(mode === "BUDGET") &&
						<Button className = "survey__actions-button" variant="contained" disabled>
							<ArrowBackIosIcon style={{fontSize:'small'}}/> Back 
      			</Button> 
					}
					{(mode !== "CATEGORIES" && mode !== "LOADING" && mode != "ERROR") &&
						<Button className = "survey__actions-button" variant="contained" color="primary" onClick={next}>
							Next <ArrowForwardIosIcon style={{fontSize:'small'}}/>
      			</Button> 
					} 
					{(mode === "CATEGORIES") &&
						<Button className = "survey__actions-button" variant="contained" disabled>
							Next <ArrowForwardIosIcon style={{fontSize:'small'}}/>
      			</Button> 
					}				   
    		</section>
			</div>
    </div>
	)
}
