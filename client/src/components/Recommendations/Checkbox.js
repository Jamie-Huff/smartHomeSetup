import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  check: {
    color:"white"
  },
}))

export default function CheckBox(props) {
  const classes = useStyles();
  const [checkedProduct, setState] = React.useState(false);

  const handleChange = (event) => {
    setState(!checkedProduct);
  }
  
  return (
    <FormGroup row >
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedProduct}
            onChange={handleChange}
            // key={id}
            color="primary"
            className={classes.check}
          />
        }
      />
    </FormGroup>
  )
}