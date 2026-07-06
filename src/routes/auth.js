const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("./models/User");

const authRouter = express.Router();

authRouter.post("/singup", async (req, res) => {
  try {
    // validation of user data
    validateSignUpData(req);

    //Encrypting password
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    console.log("passwordHash", passwordHash);

    //creating new  user  personal
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("emailId is not registered");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create token

      const token = await user.getJWT();

      // Add the token to cookies and send the response bck to the user

      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = authRouter;
