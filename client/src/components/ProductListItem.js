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
    maxWidth: 345,
    margin: "30px",
  },
  media: {
    height: 140,
  },
});

export default function ProductListItem(props) {
  const classes = useStyles();
  const [show, setShow] = useState(true);
  const {
    product_name,
    product_price,
    product_id,
    product_decription,
    product_image,
  } = props;
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + " ...Show more" : str;
  }
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product_image}
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
              {show ? truncate(product_decription, 120) : product_decription}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            {`$${product_price / 100}`}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
