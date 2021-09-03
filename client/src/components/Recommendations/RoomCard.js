import React, { useState } from "react";
import { makeStyles } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import RecListItem from "./RecListItem";

import "./RoomCard.scss";
import { avatarForProduct } from "../../helpers/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#292F3D',
    margin:'20px',
    borderRadius:'4px',
    color: 'white'
  },
  avatar: {
    backgroundColor: '#292F3D',
    marginBottom:"3px",
    fontSize:"1.4em"
  },
  cardHeader: {
    fontSize:'18px',
    marginLeft: '-16px',
    fontWeight:600,
    fontFamily:'cursive'
  },
  displayRec:{
    margin:"-18px 0px 0px -18px",
    display:"flex"
  }
}));

export default function RoomCard(props) {
  const { id, products, name, avatar, cost } = props;
  const classes = useStyles();
  console.log("IN ROOMCARD, PROPS ARE++", name, avatar, cost)

  return (
    <Card className={classes.root}>
      <div className="rec__card-top"> 
        <CardHeader
          
          title={name}
          classes={{
            title: classes.cardHeader,
            avatar: classes.avatar,
          }} 
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {avatar}
            </Avatar>
          }
        />
        <div className="rec__card-priceText">
          ${cost}
        </div>
      </div>
      <CardContent className={classes.displayRec}>
        {
          products.map((product) => {  
            return <RecListItem 
              key={product.id}
              title={product.title} 
              image={product.image}  
              price={product.price} 
              avatar={avatarForProduct(product)}
              desc={product.description}
              quantity={product.quantity}
            />
          })
        }
      </CardContent>
    </Card>
  );
}
