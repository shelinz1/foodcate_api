const express = require("express");
const asyncHandler = require("express-async-handler");
const Food = require("../models/foodModel");
const data = require("../utils/data");

const foodRouter = express.Router();

// GET ALL FOODS
foodRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const foods = await Food.insertMany(data.foods);
    if (foods) res.status(201).json(foods);
    if (!foods) res.status(404).json({ Message: "No food item was found." });
  })
);

module.exports = foodRouter;
