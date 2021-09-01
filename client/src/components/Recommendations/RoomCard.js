import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import RecListItem from "./RecListItem";


import "./RoomCard.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#292F3D',
    margin:'20px',
    borderRadius:'4px',
    color: 'white'
  },
  avatar: {
    backgroundColor: '#323949',
    marginBottom:"5px"
  },
  cardHeader: {
    marginLeft: '-16px',
    fontWeight:'600px',
    fontFamily:'cursive'
  },
  displayRec:{
    margin:"-18px 0px 0px -18px"
  }
}));

export default function RoomCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            🛋️
          </Avatar>
        }
        title="Living Room"
        classes={{
          title: classes.cardHeader,
          avatar: classes.avatar,
        }} 
      />
     
      <CardContent className={classes.displayRec}>
        <RecListItem/>
      </CardContent>
    </Card>
  );
}
