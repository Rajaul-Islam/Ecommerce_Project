import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Product from "../Product/Product";
import "./Products.css";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";
import {useAlert} from 'react-alert'
import Metadata from "../layout/Metadata";


const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Beg",
  "SmartPhone",
  "Desktop",
  "Chair",
  "table",
];
const Products = () => {
  const dispatch = useDispatch();

const alert =useAlert()
  
  const [price, setPrice] = useState([0, 25000]);
  console.log(price);
  const [category, setCategory] = useState("");
  const [ratings, setRating] = useState(0);

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);

  const {
    products,
    loading,
    error,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  console.log(productCount);
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // console.log(keyword);

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearError)
    }
    dispatch(getProduct(keyword, currentPage, price, category,ratings));
  }, [dispatch, keyword, currentPage, price, category,ratings,error]);

  let count = filteredProductsCount;
  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <Metadata title="PRODUCTS---ECOMMERS">
          </Metadata>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <Product product={product} key={product._id}></Product>
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              aria-label="Small"
              max={25000}
            ></Slider>
            <Typography>Categories</Typography>
            <ul className="gategoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Rating Above</Typography>

              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
               
                min={0}
                max={5}
                aria-label="Always visible"
             
                
                step={0.5}
               
                valueLabelDisplay="on"
              ></Slider>
            </fieldset>
          </div>
          {resultPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              ></Pagination>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
