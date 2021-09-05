import React, { useState } from "react";

import { makeStyles } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import useApplicationData from "../../hooks/useApplicationData";
import RecListItem from "./RecListItem";
import "./RoomCard.scss";
import { avatarForProduct } from "../../helpers/selectors";
import { deleteProduct } from "../../helpers/stateChangers";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#292F3D',
    margin:'20px',
    borderRadius:'5px',
    color: 'white',
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
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
    display:"flex",
    flexWrap: "wrap"
  }
}));

export default function RoomCard(props) {
  const { id, products, name, avatar, cost } = props;
  const classes = useStyles();

  const {
    deleteRecommendation,
    recommendations,
    removeProductHome,
    gotProductHome,
    setRec
  } = useApplicationData();

  const deleteRec = (removeRecObj) => {

    //do confirmation "ONCE YOU DELETE, ITS GONE FOREVER"
    //transition to deleting

    deleteRecommendation(removeRecObj)
    .then((res) => {
      console.log("INSIDE ROOM CARD, DEL REC")
    })
    .catch((err) =>{
      console.log(err);
    })

  }

  const deleteProductHome = (removeProdHomeObj) => {

    removeProductHome(removeProdHomeObj)
    .then((res) => {
      console.log("INSIDE ROOM CARD, REMOVE PROD HOME")
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  const addProductHome = (addProdHomeObj) => {

    gotProductHome(addProdHomeObj)
    .then((res) => {
      console.log("INSIDE ROOM CARD,ADD PROD HOME")
    })
    .catch((err) =>{
      console.log(err);
    })
  }

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
          ${cost/100}
        </div>
      </div>
      <CardContent className={classes.displayRec}>
        {
          products.map((product) => {
            return <RecListItem
              key={product.id}
              id = {product.id}
              title={product.name}
              image={product.image}
              price={product.price}
              avatar={avatarForProduct(product)}
              desc={product.description}
              quantity={product.quantity}
              stores={product.stores}
              deleteRec={deleteRec}
              deleteProductHome={deleteProductHome}
              addProductHome={addProductHome}
            />
          })
        }
      </CardContent>
    </Card>
  );
}
