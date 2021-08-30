import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

//FOR PROVIDER
import AppleIcon from '@material-ui/icons/Apple';
import AndroidIcon from '@material-ui/icons/Android';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  android: {
    marginBottom: '5px',
    marginLeft:'4px'
  },

  apple: {
    marginBottom: '5px',
  },

  providerNames: {
    display:"flex", 
    justifyContent:"center"
  },

  select: {
    backgroundColor:"#e5e4e2"
  },

  inputLabel: {
    color: "white"
  }

}));

export default function Provider(props) {
  const { provider, setProvider } = props

  const classes = useStyles(); 
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setProvider(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  console.log(provider)

  return(


      <FormControl className={classes.formControl}>
        <InputLabel className={classes.inputLabel}>Provider</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={provider}
          onChange={handleChange}
          className={classes.select}
        >
          <MenuItem value={"android"}><span className={classes.providerNames}>Android</span>{open&&<AndroidIcon className={classes.android}/>}</MenuItem>
          <MenuItem value={"apple"}><span className={classes.providerNames}>Apple</span>{open&&<AppleIcon className={classes.apple}/>}</MenuItem>
          <MenuItem value={"universal"}><span className={classes.providerNames}>Both</span></MenuItem>
        </Select>
      </FormControl>

    
  )
}
