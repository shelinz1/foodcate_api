const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./utils/database");
const userRouter = require("./routes/userRoute.js");
const data = require("./utils/data");

// for env files
dotenv.config();

const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);

app.get("/secure", (req, res) => {
  return res
    .status(401)
    .json({ message: "You need to be logged in to access this resource" });
});

app.get("/", (req, res) => {
  res.send(data.users);
});

const port = process.env.PORT;
app.listen(port, console.log("server running on port " + port));
