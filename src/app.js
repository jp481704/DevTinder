const express = require("express");
const app = express();
const { adminAuth } = require("./middleware/auth.js");
const Dbfunction = require("./config/dataBase.js");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const { userAuth } = require("./middleware/auth.js");

app.use(express.json());
app.use(cookieParser());

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

app.patch("/update", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const allowedUpdates = [
      "userId",
      "photoUrl",
      "about",
      "skills",
      "age",
      "gender",
    ];

    const isUpdateAllowed = Object.keys(data).every((update) =>
      allowedUpdates.includes(update),
    );

    if (!isUpdateAllowed) {
      throw new Error("Invalid updates");
    }

    if (data.skills.length > 10) {
      throw new Error("skills should not be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user update successfully");
  } catch (err) {
    res.status(400).send("Update failed " + err.message);
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
