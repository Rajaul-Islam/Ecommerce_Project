import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearError, getProductDetails } from "../../actions/productAction";
import { useAlert } from "react-alert";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../ReviewCard/ReviewCard";
import Loader from "../layout/Loader/Loader";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const {
    images,
    ratings,
    name,
    _id,
    numOfReviews,
    price,
    stock,
    description,
    reviews,
  } = product;
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: ratings,
    size: window.innerWidth < 600 ? 16 : 20,
    isHalf: true,
  };

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearError())
    }
    dispatch(getProductDetails(id));
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {images &&
                  images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{name}</h2>
                <p>id:{_id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews}Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`${price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                  </div>{" "}
                  <button>Add to Cart</button>
                </div>
                <p>
                  status:{" "}
                  <b className={stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{description}</p>
                <button className="submitReview">Submit Review</button>
              </div>
            </div>
          </div>
          <h3 className="reviewHeading">Reviews</h3>

          {reviews && reviews[0] ? (
            <div className="reviews">
              {reviews &&
                reviews.map((review) => (
                  <ReviewCard key={review._id} review={review}></ReviewCard>
                ))}
            </div>
          ) : (
            <p className="noReview">No Review Yet</p>
          )}

          {/*
      
       {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )} 
      
      */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
