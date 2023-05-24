const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a name"],
    },
    email: {
      type: String,
      required: [true, "please add an email"],
      unique: true,
    },
    image: {
      type: String,
      // required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      // default: "",
    },
    password: {
      type: String,
      required: [true, "please add a password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
