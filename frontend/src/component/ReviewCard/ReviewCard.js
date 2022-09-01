import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../image/Profile.png";

const ReviewCard = ({review}) => {
const {user, name, rating, comment,_id}=review

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: rating,
    size: window.innerWidth < 600 ? 16 : 20,
    isHalf: true,
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="user" />
      <p>{name}</p>
      <ReactStars {...options}></ReactStars>
      <span>{comment}</span>
    </div>
  );
};

export default ReviewCard;
