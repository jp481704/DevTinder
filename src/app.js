const express = require("express");

const app = express();
const { adminAuth } = require("./middleware/auth.js");

const Dbfunction = require("./config/dataBase.js");
const User = require("./models/User");

app.use(express.json());

app.post("/singup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  await user.save();
  res.send("User created successfully");
});

app.get("/feed", async (req, res) => {
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
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });
    res.send("user update successfully");
  } catch {
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
