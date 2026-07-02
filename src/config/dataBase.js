const { mongoose } = require("mongoose");

const Dbfunction = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/devTinder");
    console.log("Database connected");
  } catch (err) {
    console.log("DB not connected");
  }
};

module.exports = Dbfunction;

