import React, { useState } from "react";
import { useHistory } from "react-router-dom";


import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import "./index.scss";
import "./naoSpeaksSurvey.scss";

import Form from "./Form.js"
import { naoSurveyQuestions } from "../../helpers/naoHelp"
import useVisualMode from "../../hooks/useVisualMode"

//Modes for the form to use for rendering
const BUDGET = "BUDGET";
const CATEGORIES = "CATEGORIES";
const ERROR_NO_BUDGET = "ERROR_NO_BUDGET";
const ERROR_SERVER = "ERROR_SERVER";
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
	const { submitSurveyUser, handleSurveyClose, submitSurveyAnon } = props;

	const classes = useStyles();
	let history = useHistory();

	// state for navigation to profile
	// const [profile, setProfile] = useState(false);

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
			console.log("SURVEY DATA",surveyData);
			//check if this is a user's request or anonymous, to determine the routing
			if(surveyData.user) {
				console.log("TRYING TO ENTER SUB SURV USER")
				if(surveyData.budget === 0) {
					transition(ERROR_NO_BUDGET);
				} else {
					submitSurveyUser(surveyData)
					.then((res) => {
						console.log("WITHIN INDEX FRONT END",res)
	
						handleSurveyClose();
						history.push("/profile");
					})
					.catch((err) =>{
						console.log(err);
						transition(ERROR_NO_BUDGET);
					})
				}
			} else { //Anon user
				console.log("TRYING TO ENTER SUB SURV ANON")
				if(surveyData.budget === 0) {
					transition(ERROR_NO_BUDGET);
				} else {
					submitSurveyAnon(surveyData)
					.then((res) => {
						console.log("WITHIN INDEX FRONT END",res)
	
						handleSurveyClose();
						history.push("/notLoggedIn");
					})
					.catch((err) =>{
						console.log(err);
						transition(ERROR_NO_BUDGET);
					})
				}
			}
			console.log("SET TIMEOUT IS FINISHED")
			}, 1000);
	}
	
	

	return (
		<div  className={classes.paper} style ={{marginLeft:'20px'}}>
      <div className="survey__card survey__card--create">
				{/* Dont load nao top pic ic its loading or displaying an error message */}
				{ (mode!== "LOADING" && mode!= "ERROR_NO_BUDGET") && 
					<section className="survey__card-nao_ask">
						<img src="images/nao_ask.png" alt="nao" className="survey__card-img"/>
						<div className="naoBox__speaking naoBox__speaking-sb6">
							{naoSurveyQuestions(mode)}
						</div>
					</section>
				}
				<section className="survey__card-form">
					<Form save={save} mode={mode} backToStart={backToStart}/>
				</section>			
    		<section className="survey__actions">
					{(mode !== "BUDGET" && mode !== "LOADING" && mode != "ERROR_NO_BUDGET") &&
						<Button className = "survey__actions-button" variant="contained" color="default" onClick={goBack}>
							<ArrowBackIosIcon style={{fontSize:'small'}}/> Back 
      			</Button> 
					}
					{(mode === "BUDGET") &&
						<Button className = "survey__actions-button" variant="contained" disabled>
							<ArrowBackIosIcon style={{fontSize:'small'}}/> Back 
      			</Button> 
					}
					{(mode !== "CATEGORIES" && mode !== "LOADING" && mode != "ERROR_NO_BUDGET") &&
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
