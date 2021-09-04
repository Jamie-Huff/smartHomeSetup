import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';

import { checkForUser } from "../../helpers/dataOrganisers"

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
import Link from '@material-ui/core/Link';

import { formDataForRemoveRec } from "../../helpers/dataOrganisers";

import "./RecListItem.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: 350,
    backgroundColor: '#323949',
    margin:'20px',
    color:"white",
    borderRadius:"8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  media: {
    height: 220,
    margin: "5px 20px 20px 20px",
    borderRadius:"2px",
    backgroundSize: "contain",
    backgroundColor: "#fff",
  },
  avatar: {
    backgroundColor: '#535e79',
  },
  infoIcon: {
    marginLeft: '-10px',
    color:"white"
  },
  cardHeader: {
    fontSize:"1em",
    fontWeight:'bold'
  },
  checkBox: {
    marginTop:"2px"
  },
  price: {
    marginLeft:"10px",
    fontWeight:600
  },
  content: {
    color:"white",
    fontWeight:500,
    fontFamily: "Arial"
  },
  quantity: {
    color:"yellow",
    marginLeft:"10px"
  },
  store: {
    margin:"10px 0px 0px 20px",
    color:"#b2ec5d"
  },
  stores: {
    display:"flex",
    justifyContent:"flex-start"
  },
  none: {
    backgroundColor: "#fff",
    borderRadius: "2px",
    margin: "0px 16px"
  }
}));

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) : str;
}

export default function RecListItem(props) {

  const { id, title, image, price, info, desc, avatar, stores, quantity, deleteRec } = props
  // console.log("PRODUCT ID in RECLISTITEM", key)
  const classes = useStyles();

  const handleDelete = () => {
    const removeRecObj = formDataForRemoveRec(id, checkForUser());
    deleteRec(removeRecObj);
  }

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
        title={truncate(title, 57)}
        classes={{
          title: classes.cardHeader,
          action: classes.checkBox,
        }}
      />
      <div className={classes.stores}>
        {
          stores.map((store) =>{
            return <a href={store.productLink} className={classes.store}>
              {store.name}
            </a>
          })
        }
      </div>
      <div className={classes.none}>
      <CardMedia
        className={classes.media}
        image={image}
        title={title}

      />
      </div>
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p" className={classes.content}>
          {
            desc
          }

        </Typography>
      </CardContent>
      <CardActions className="rec__actions">
          <div>
            <div className={classes.price}>
              ${price/100}
              {(quantity > 1) &&
                <span className={classes.quantity}>x{quantity}</span>
              }
            </div>
          </div>
          <div>
            <IconButton>
              <InfoIcon className={classes.infoIcon}/>
            </IconButton>
            <IconButton >
<<<<<<< HEAD
              <DeleteIcon className={classes.infoIcon}/>
            </IconButton>
=======
              <DeleteIcon onClick={handleDelete} className={classes.infoIcon}/>
            </IconButton>   
>>>>>>> master
          </div>

      </CardActions>
    </Card>
  );
}
