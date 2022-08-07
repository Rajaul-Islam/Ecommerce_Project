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

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
