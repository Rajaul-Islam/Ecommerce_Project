import React, { Fragment } from "react";
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import Product from "../Product/Product";

const product = {
  name: "lsfkjdlkjf",
  price: 2145,
  image: [{ url: "https://i.ibb.co/sgxc1wd/music-Lessons.png" }],
  _id: "lsdkjflj",
};

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to Buy Your Dream</p>
        <h1>Find amazing products below</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse></CgMouse>
          </button>
        </a>
      </div>
      <h2 className="HomeHeading">Features Products</h2>
      <div className="container" id="container">
        <Product product={product}></Product>
      </div>
    </Fragment>
  );
};

export default Home;
