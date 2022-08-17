const ErrorHandler = require("../utils/errorHander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "server error";

  //wrong mongo id error # cast error
  if(err.name === "CastError"){
    const message = `resource not found. Invalid: ${err.path} `;
    // console.log("error name",err.name)
    err = new ErrorHandler(message, 400);
    // console.log("error=",err);
    
  }

  //mongoose duplicate key error


  if(err.code===11000){
    const message =`duplicate ${Object.keys(err.keyValue)} entered `

    err = new ErrorHandler(message, 400);
  }


   // Wrong JWT error
   if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }
  
  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
