import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';

import Checkbox from './Checkbox'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import "./RecListItem.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: '#323949',
    margin:'20px',
    color:"white"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: '#535e79',
  },
  infoIcon: {
    marginLeft: '-10px',
    color:"white"
  },
  cardHeader: {
    fontSize:"16px",
    fontWeight:'bold',
  },
  checkBox: {
    marginTop:"2px"
  },
  price: {
    marginLeft:"10px",
    fontWeight:600
  },
  content: {
    color:"white"
  },
}));

export default function RecListItem(props) {

  const { title, image, price, info, desc, avatar, stores } = props

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {avatar}
          </Avatar>
        }
        action={
          <Checkbox/>
        }
        title={title}
        classes={{
          title: classes.cardHeader,
          action: classes.checkBox,
        }} 
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={title}
        
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p" className={classes.content}>
          {
            desc
          }
          
        </Typography>
      </CardContent>
      <CardActions className="rec__actions">
          <div>
            <div className={classes.price}>${price}</div>
          </div>
          <div>
            <IconButton>
              <InfoIcon className={classes.infoIcon}/>
            </IconButton>
            <IconButton >
              <DeleteIcon className={classes.infoIcon}/>
            </IconButton>   
          </div>
          
      </CardActions>
    </Card>
  );
}
