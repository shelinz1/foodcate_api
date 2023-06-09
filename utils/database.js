const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    // const conn = await mongoose.connect("mongodb://localhost/foodcate");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`${conn.connection.readyState}`);

    console.log(`mongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
