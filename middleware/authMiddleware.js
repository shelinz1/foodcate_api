const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//GENEREATE JWT TOKEN
const getToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const guide = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token =
        req.headers.authorization.split(" ")[1] ||
        req.headers.authorization.slice(7, req.headers.authorization.length);

      //verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
};

module.exports = { guide, getToken };
