const adminAuth = (req, res, next) => {
  const token = "xyzssss";

  const isAuthenticated = token === "xyz";

  if (!isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

module.exports = { adminAuth };
