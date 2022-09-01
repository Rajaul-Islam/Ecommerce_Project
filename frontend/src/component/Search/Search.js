import React, { useState, Fragment } from "react";
import MetaData from "../layout/Metadata";
import "./Search.css";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
const Search = (props) => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  console.log(props);
  console.log(props.history);
  //  },[history])
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // props.history.push(`/products/${keyword}`);
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
      // props.history.push("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
