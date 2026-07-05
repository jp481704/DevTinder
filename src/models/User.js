const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is not valid " + value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("password is not strong " + value);
      }
    },
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("gender data is not valid");
      }
    },
  },
  photoUrl: {
    type: String,
  },
  about: {
    type: String,
    default: "Hey there! I am using DevTinder.",
  },
  skills: {
    type: [String],
  },
});

userSchema.methods.getJWT = async function(){
const user = this;

 const token = await jwt.sign({ userId: user._id }, "DevTinder$790",{expiresIn: "1d"});


 return token;
};


userSchema.methods.validatePassword = async function(passwoerdInputByUser){
  const user = this;

  const isPasswordValid = await bcrypt.compare(passwoerdInputByUser, user.password);

  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
