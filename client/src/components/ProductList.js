import React from "react";
import ProductListItem from "./ProductListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "30px",
    fontSize: "40px",
  },
  section: {
    border: "red solid 2px",
    width: "100%",
  },
  secondDiv: {
    border: "pink solid 3px",
    display: "flex",
  },
});

const ProductList = (props) => {
  const { products } = props;
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

  return (
    <div>
      <section>
        {categoryArray.map((category) => (
          <div>
            <h1 className={classes.root}>{category.name}</h1>
            {getCategoryProduct(category.idArray).map((product) => (
              <div>
                <ProductListItem
                  product_image={product.image}
                  product_decription={product.description}
                  product_name={product.name}
                  product_price={product.price}
                />
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProductList;
