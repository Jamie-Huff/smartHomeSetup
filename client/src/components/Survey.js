import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import "./Survey.scss";


const useStyles = makeStyles((theme) => ({
  paper: {
		position: 'absolute',
		width: 500,
		height:500,
    // backgroundColor: "#dce7f3",
    // border: "2px light #000",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3)
  }
}));

export default function Survey (props) {
	const classes = useStyles()

	const handleNameChange = event => {
		console.log ("yus")
	}
	return (
		<div  className={classes.paper} style ={{marginLeft:'20px'}}>
		
      <div className="survey__card survey__card--create">
				<section className="survey__card-nao_ask">
					<img src="images/nao_ask.png" alt="nao" className="survey__card-img"/>
				</section>

    		<section className="survey__actions">
					<Button variant="contained" color="default">
						<ArrowBackIosIcon/> Back 
      		</Button> 
					<Button variant="contained" color="primary">
						Next <ArrowForwardIosIcon/>
      		</Button>  				   
    		</section>
			</div>
    </div>
	)
}
