import React from "react";
import "./Product.css"
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";


const Product = (props) => {
  const { name, price, images,numOfReviews ,_id,ratings } = props.product;
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: ratings,
    size: window.innerWidth<600? 16: 20,
    isHalf: true,
  };

  return (
    <Link className="productCard" to="/product/:id">
      <img src={images[0].url} alt={name} />
      <p>{name}</p>
      <div>
        <ReactStars {...options}>
        </ReactStars>
        <span>{numOfReviews} Reviews</span>

      </div>
      <span>${price}</span>
    </Link>
  );
};

export default Product;
