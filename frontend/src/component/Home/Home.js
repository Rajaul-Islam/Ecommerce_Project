import React, { Fragment } from "react";
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import Product from "../Product/Product";
import Metadata from "../layout/Metadata";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";




const Home = () => {
  
  const alert = useAlert()
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if(error){
      return alert.error(error)
    }
    dispatch(getProduct());
  }, [dispatch,error]);
  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <Metadata title="meta data is working"></Metadata>
          
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
            {products &&
              products.map((product) => (
                <Product product={product} key={product._id}></Product>
              ))}
          </div>
        </Fragment>
        
      )}
      {/* <button
      onClick={() => {
        alert.show('Oh look, an alert!')
      }}
    >
      Show Alert
    </button> */}
    </Fragment>
  );
};

export default Home;
