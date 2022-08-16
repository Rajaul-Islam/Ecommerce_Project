const mongoose = require("mongoose");
const validator = require("validator");
const jwt= require("jsonwebtoken")
const bcrypt= require("bcryptjs") 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },

  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength: [8, "password should be greater then 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date
});
userSchema.pre("save",async function(next){

  if(!this.isModified("password")){
    next();
  }

  this.password=await bcrypt.hash(this.password,10)
})
// jwt token

userSchema.methods.getJWTToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
  });

}

//compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}



module.exports = mongoose.model("User", userSchema);