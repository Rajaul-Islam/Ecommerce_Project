const ErrorHandler = require("../utils/errorHander");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")
const User = require("../productModels/userModel")




exports.isAuthentiicatedUser = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies;
    console.log(token)

    if(!token){
        return next (new ErrorHandler("please login to access the resource", 401))
    }
const decodeData = jwt.verify(token, process.env.JWT_SECRET)

req.user=await User.findById(decodeData.id)
next()
})


exports.authorizeRoles = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403))
        }
        next();
    }
}
