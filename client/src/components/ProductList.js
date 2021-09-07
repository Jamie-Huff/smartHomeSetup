import React from "react";
import "./ProductList.scss";
import ProductListItem from "./ProductListItem";
import { makeStyles } from "@material-ui/core/styles";
import transitions from "@material-ui/core/styles/transitions";

const PRODUCTS = "PRODUCTS"

const useStyles = makeStyles({
  root: {
    margin: "5px 5px 5px 18px",
    fontSize: "30px",
    fontStyle:"italic",
    color: "#F5F5F5"
  },
  productsDiv: {
    display: "flex",
    flexWrap: "wrap",
  }
});

const ProductList = (props) => {
  const { products, transitionNao } = props;
  const classes = useStyles();

  const categoryArray = [
    { name: "Hubs", idArray: [1] },
    { name: "Lights", idArray: [2, 3] },
    { name: "Security Devices", idArray: [4, 5, 6, 15] },
    { name: "Appliances", idArray: [7, 8, 9, 10, 11, 12, 14, 17] },
    { name: "Thermostats", idArray: [13] },
    { name: "Speakers", idArray: [16] },
    { name: "Televisons", idArray: [17] },
    { name: "Garage", idArray: [18] },
  ];

  // a function that returns the product accossiated with the categroyID
  const getCategoryProduct = (idArray) => {
    return products.filter((product) => idArray.includes(product.category_id));
  };

  if (!products.length) {
    return <h1>Loading....</h1>
  } else {
    transitionNao(PRODUCTS)
    return (
      <section>


        {categoryArray.map((category) => (
          <div>
            <div>
             <h1 className={classes.root}>{category.name}</h1>
            </div>
            <div className={classes.productsDiv}>
              {getCategoryProduct(category.idArray).map((product) => (
                <ProductListItem
                  product_id={product.id}
                  product_image={product.image}
                  product_decription={product.description}
                  product_name={product.name}
                  product_price={product.price}
                />
              ))}
            </div>
          </div>
        ))}

      </section>
    );
  }
};

export default ProductList;
