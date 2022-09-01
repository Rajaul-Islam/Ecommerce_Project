import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import Product from "../Product/Product";
import "./Products.css";


const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, padoductsCount } = useSelector(
    (state) => state.products
  );

  const { keyword } = useParams();
  
  console.log(keyword);

  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);
  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <Product product={product} key={product._id}></Product>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
