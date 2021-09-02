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
    backgroundColor: '#323949',
    marginBottom:"3px"
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

  const Recommendations = products.map((product) => {  
    console.log("AVATAR FOR PRODUCT IS+++", avatarForProduct(product))
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

  return (
    <Card className={classes.root}>
      <div className="rec__card-top"> 
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {avatar}
            </Avatar>
          }
          title={name}
          classes={{
            title: classes.cardHeader,
            avatar: classes.avatar,
          }} 
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
