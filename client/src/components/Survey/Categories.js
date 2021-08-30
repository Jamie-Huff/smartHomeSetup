import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '-40px',
    fontSize: '3em'
  },
  formControl: {
    margin: theme.spacing(3),
  },

  formLabel: {
    color:"white", 
    fontSize:"0.3em"
  },

  button: {
    color:"#00b7eb",
    marginTop:"16px",
    fontWeight:"bold"
  }
}));

export default function Categories(props) {
  const { save, userResponse } = props;
  const classes = useStyles();

  const [category, setCategory] = useState({
    lights: false,
    speakers: false,
    hubs: false,
    appliances: false,
    thermostat: false,
    security: false,
    garage: false,
  });

  const [quantity, setQuantity] = useState({
    lights:"",
    speakers:"",
    hubs:""
  });

	const handleQuantityChange = event => {
		setQuantity({ ...quantity, [event.target.name]: event.target.value });
	}

  const handleCategoryChange = (event) => {
    setCategory({ ...category, [event.target.name]: event.target.checked });
  };

  const { lights, speakers, hubs, appliances, thermostat, security, garage } = category;
  const { lightsQty, speakersQty, hubsQty } = quantity;

  return(

      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.formLabel}>Categories</FormLabel>
          <FormGroup >
            <div className="survey__create-flex">
              <FormControlLabel
                control={<Checkbox checked={lights} onChange={handleCategoryChange} name="lights" />}
                label="Lights"
              />
              {lights&&<input
                className="survey__create-input-category text--semi-bold"
                name="lights"
                type="text"
	              value = {lightsQty}
                placeholder=""
			          onChange={handleQuantityChange}
                autoComplete="off"
              /> } 
            </div>
            <div className="survey__create-flex">
              <FormControlLabel
                control={<Checkbox checked={speakers} onChange={handleCategoryChange} name="speakers" />}
                label="Speakers"
              />
              {speakers&&<input
                className="survey__create-input-category text--semi-bold"
                name="speakers"
                type="text"
	              value = {speakersQty}
                placeholder=""
			          onChange={handleQuantityChange}
                autoComplete="off"
              /> } 
            </div>
            <div className="survey__create-flex">
              <FormControlLabel
                control={<Checkbox checked={hubs} onChange={handleCategoryChange} name="hubs" />}
                label="Hubs"
              />
              {hubs&&<input
                className="survey__create-input-category text--semi-bold"
                name="hubs"
                type="text"
	              value = {hubsQty}
                placeholder=""
			          onChange={handleQuantityChange}
                autoComplete="off"
              /> } 
            </div>
            <FormControlLabel
              control={<Checkbox checked={appliances} onChange={handleCategoryChange} name="appliances" />}
              label="Appliances"
            />
            <FormControlLabel
              control={<Checkbox checked={thermostat} onChange={handleCategoryChange} name="thermostat" />}
              label="Thermostat"
            />       
            <FormControlLabel
              control={<Checkbox checked={security} onChange={handleCategoryChange} name="security" />}
              label="Security Devices"
            />
            <FormControlLabel
              control={<Checkbox checked={garage} onChange={handleCategoryChange} name="garage" />}
              label="Garage Devices"
            />
          </FormGroup>
          <Button className={classes.button} variant="outlined" color="primary" onClick={save}>
            GET RECOMMENDATIONS
          </Button>
        </FormControl>
      </div>        
  )
}