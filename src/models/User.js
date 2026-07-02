const mongoose = require("mongoose");

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
  },
  password: {
    type: String,
    required: true,
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

module.exports = mongoose.model("User", userSchema);
