const express = require("express");
const User = require("../models/User");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/Edit", userAuth, async (req, res) => {
 try{
  if(  validateEditProfileData(req)){
    return res.status(400).send("ERROR: Invalid request");
  }

const loggedInUser = req.user;



 }catch (err){
  res.status(400).send("ERROR:" + err.message);
 
 }
});

module.exports = profileRouter;
