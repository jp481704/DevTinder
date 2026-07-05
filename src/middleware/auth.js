const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminAuth = (req, res, next) => {
  const token = "xyzssss";

  const isAuthenticated = token === "xyz";

  if (!isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

const userAuth = async (req, res, next) => {
  try {
    // Read token from cookies
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid token");
    }

    // Verify JWT
    const decoded = jwt.verify(token, "DevTinder$790");

    // Get userId from payload
    const { userId } = decoded;

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = { adminAuth, userAuth };