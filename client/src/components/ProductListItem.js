import React, { useState } from "react";
import classNames from "classnames/bind";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 350,
    margin: "10px"

  },
  media: {
    backgroundSize: "contain",
    height: 220,
  },

});

export default function ProductListItem(props) {
  const classes = useStyles();
  const [show, setShow] = useState(true);
  const {
    product_name,
    product_price,
    product_decription,
    product_image,
  } = props;
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + " ...Show More" : str;
  }
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product_image}
            alt="product image"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.test}
            >
              {product_name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              onClick={() => setShow(show ? false : true)}
            >
              {show ? truncate(product_decription, 125) : `${product_decription} ...Show Less`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions >
          <Button size="small" color="primary">
            {`$${product_price / 100}`}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
