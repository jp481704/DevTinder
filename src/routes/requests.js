const express = require("express");
const User = require("./models/User");

const requestsRouter = express.Router();

requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending a connection request");
  res.send(user.firstName + " sent Connection request successfully");
});

module.exports = requestsRouter;
