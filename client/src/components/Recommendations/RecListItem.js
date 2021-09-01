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
    marginLeft:"10px"
  },
  content: {
    color:"white"
  },
}));

export default function RecListItem() {

  const classes = useStyles();

  const [checkedProduct, setState] = React.useState(false);
  const handleChange = (event) => {
    setState(!checkedProduct);
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            💡
          </Avatar>
        }
        action={
            <Checkbox/>
        }
        title="Shrimp and Chorizo Paella"
        classes={{
          title: classes.cardHeader,
          action: classes.checkBox,
        }} 
      />
      <CardMedia
        className={classes.media}
        image="images/nao_welcome.png"
        title="Phillips"
        
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p" className={classes.content}>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.<span style = {{fontWeight:"bold"}}> Purchase at x, y</span>
        </Typography>
      </CardContent>
      <CardActions className="rec__actions">
          <div>
            <div className={classes.price}>$1000</div>
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
