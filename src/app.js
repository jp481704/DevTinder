const express = require("express");
const app = express();
const { adminAuth } = require("./middleware/auth.js");
const Dbfunction = require("./config/dataBase.js");
const User = require("./models/User");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const { userAuth } = require("./middleware/auth.js");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestsRouter = require("./routes/requests.js");

app.use(express.json());
app.use(cookieParser());


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestsRouter)

app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const userId = req.body.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});



Dbfunction()
  .then(() => {
    console.log("database connected");
    app.listen(8800, () => {
      console.log("Server is running on port 8800");
    });
  })
  .catch(() => {
    console.log("database not connected");
  });
