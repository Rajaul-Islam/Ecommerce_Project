const ErrorHandler = require("../utils/errorHander");

const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../productModels/userModel");
const sendToken = require("../utils/jwtToken");

//register user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profile picture",
    },
  });

  sendToken(user, 200, res)

  
});





  //login user

  exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("please enter email & password", 400));
    }
    const user =await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("invalid email or password", 401));
    }
    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("invalid email or password", 401));
    }
     sendToken(user, 200, res)
  });


  //logout user

  exports.logout = catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
      expires: new Date(Date.now()),
      httpOnly: true,
    })



    res.status(200).json({
      success: true,
      message: "logged out"
    })
  })