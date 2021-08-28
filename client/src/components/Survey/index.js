import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import "./index.scss";


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
	const [name, setName] = useState("")

	const [userResponse, setUserResponse] = useState({
		budget: 0,
		provider: "",
		categories: {},
		rooms: [],	
	})
	


	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target.value)
	}

	const handleNameChange = event => {
		console.log ("yus")
	}
	return (
		<div  className={classes.paper} style ={{marginLeft:'20px'}}>
		
      <div className="survey__card survey__card--create">
				<section className="survey__card-nao_ask">
					<img src="images/nao_ask.png" alt="nao" className="survey__card-img"/>
				</section>
				<div>
				<form>
				<label>User name</label>
				<input type="text" onChange={(e) => setName(e.target.value)} />
				<button type = "submit" onClick={handleSubmit}>Sign Up</button>
			</form>
				</div>

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
