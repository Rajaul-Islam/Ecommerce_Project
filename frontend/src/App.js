import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import React from "react";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/ProductDetails/ProductDetails";

function App() {
  // React.useEffect(()=>{
  //   webFont.load({
  //     google: {
  //       families: ["Roboto", "Droid Sans","Chilanka"]
  //     }
  //   })
  // },[])

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sad" element={<Loader></Loader>} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
