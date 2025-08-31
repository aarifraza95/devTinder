const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
  },
  lastName: {
    type: String,
    required:true,
  },
  gender: {
    type: String,
    required:true,
  },
  age: {
    type: Number,
    required:true,
  },
  about:{
    type: String,
  },
  emailId: {
    type: String,
    required:true,
  },
  password: {
    type: String,
    required:true,
  },
  skills:{
    type: [String],
  },
  
},
{
  timestamps: true,
});
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790", {expiresIn: "1d"});
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordMatch = await bcrypt.compare
  {passwordInputByUser, passwordHash};
  return isPasswordMatch;
};
module.exports = mongoose.model("user", userSchema);
