import React from "react";
import "./Product.css"
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  value: 2.5,
  size: window.innerWidth<600? 16: 20,
  isHalf: true,
};
const Product = (props) => {
  const { name, price, image, _id } = props.product;
  return (
    <Link className="productCard" to={_id}>
      <img src={image[0].url} alt={name} />
      <p>{name}</p>
      <div>
        <ReactStars {...options}>
        </ReactStars>
        <span>(256 reviews)</span>

      </div>
      <span>{price}</span>
    </Link>
  );
};

export default Product;
