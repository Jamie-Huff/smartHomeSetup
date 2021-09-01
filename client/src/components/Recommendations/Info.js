import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    color:"white"
  },
}));

export default function Info(props) {
  return (
    <InfoIcon className={classes.main}/>
  )
}