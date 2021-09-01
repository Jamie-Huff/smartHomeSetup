import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '-40px',
    fontSize: '3em'
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function Form(props) {
  const{ rooms, setRooms } = props
  const classes = useStyles();

  const handleChange = (event) => {
    setRooms({ ...rooms, [event.target.name]: event.target.checked });
  };

  const { livingRoom, kitchen, bathRoom, bedRoom, laundryRoom, entryWay, garage, yard } = rooms;
  return(

      <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel style={{color:"white", fontSize:'0.3em'}}component="legend">Rooms</FormLabel>
        <FormGroup >
          <div style={{display:"flex"}}>
            <FormControlLabel
              control={<Checkbox checked={livingRoom} onChange={handleChange} name="livingRoom" />}
              label="Living Room"
            />
          </div>
          <FormControlLabel
            control={<Checkbox checked={kitchen} onChange={handleChange} name="kitchen" />}
            label="Kitchen"
          />
          <FormControlLabel
            control={<Checkbox checked={bathRoom} onChange={handleChange} name="bathRoom" />}
            label="Bath Room"
          />
          <FormControlLabel
            control={<Checkbox checked={bedRoom} onChange={handleChange} name="bedRoom" />}
            label="Bedroom"
          />
          <FormControlLabel
            control={<Checkbox checked={laundryRoom} onChange={handleChange} name="laundryRoom" />}
            label="Laundry Room"
          />
          <FormControlLabel
            control={<Checkbox checked={entryWay} onChange={handleChange} name="entryWay" />}
            label="Entry Way"
          />
          <FormControlLabel
            control={<Checkbox checked={garage} onChange={handleChange} name="garage" />}
            label="Garage"
          />
          <FormControlLabel
            control={<Checkbox checked={yard} onChange={handleChange} name="yard" />}
            label="Yard"
          />
        </FormGroup>
      </FormControl>
    </div>
    
  )
}
