const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { getToken, guide } = require("../middleware/authMiddleware");
const multer = require("multer");

// Set up multer storage and file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the Multer upload instance
const upload = multer({ storage });

const userRouter = express.Router();

//REGISTER A USER ®
userRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, image, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please enter all fields");
    }

    // Check if user exists
    await User.findOne({ email }).then((user) => {
      if (user) {
        res.status(400);
        throw new Error("You are already a registered user");
      }
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      image,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          password: user.password,
          token: getToken(user._id),
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);

userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please enter all fields");
    }

    //check if user is already registered
    const user = await User.findOne({ email });

    //compare entered password with registered pasword and return a json object
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        message: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          token: getToken(user._id),
        },
      });
    } else {
      res.status(401);
      throw new Error("Email or Password not registered.");
    }
  })
);

//GET USER PROFILE 🧑
userRouter.get(
  "/:id",
  guide,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

//UPDATE USER PROFILE 🆕
userRouter.put(
  "/:id",
  guide,
  asyncHandler(async (req, res) => {
    const { name, email, image, password } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      user.name = name || user.name;
      // user.email = email || user.email;
      // user.image = image || user.image;

      //check if email is already registered with another account
      const emailExist = await User.findOne({ email });

      if (emailExist) {
        res.status(401);
        throw new Error("Email is registered with another account");
      } else {
        user.email = email || user.email;
      }

      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await user.save();
      res.status(200).send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        password: updatedUser.password,
        token: getToken(updatedUser),
      });
    } else {
      res.status(404);
      throw new Error("user not found.");
    }
  })
);

userRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find();

    if (users) {
      res.status(200).send(users);
    } else {
      res.status(404);
      throw new Error("Users not found");
    }
  })
);

// Update user profile picture
userRouter.post(
  "/profile-update",
  guide,
  upload.single("avater"),
  asyncHandler(async (req, res) => {
    // update the user profile picture field in the database
    const user = await User.findById(req.user._id);

    if (user) {
      //store the filename in the user model
      user.image = req.file.filename;
      await user.save();
      res.status(200).json({ massage: "profile updated successsfully." });
    } else {
      res.status(200).json({ massage: "error updating profile picture." });
    }
  })
);

module.exports = userRouter;
