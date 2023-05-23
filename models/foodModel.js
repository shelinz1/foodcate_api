const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    image: {
      type: String,
      required: [true, "please add an image"],
    },
    price: {
      type: Number,
      required: [true, "please add a price"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
