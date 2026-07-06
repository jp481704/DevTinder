const express = require("express");
const User = require("./models/User");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exist");
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("ERROR:", err.message);

    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = profileRouter;
