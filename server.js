const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./utils/database");
const cors = require("cors");
const userRouter = require("./routes/userRoute.js");
const data = require("./utils/data");
const { errorHandler } = require("./middleware/errorMiddleware");
const foodRouter = require("./routes/foodRoute");

// for env files
dotenv.config();

const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors middleware
app.use(cors());

app.use("/api/users", userRouter);

app.use("/api/foods", foodRouter);

app.use(errorHandler);
if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res.send(
      `<div style="text-align:center;color:yellow"><h5>server running in production environment</h5></div>`
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send(
      `<div style="text-align:center;color:yellow"><h5>server running- please set to production</h5></div>`
    );
  });
}

const port = process.env.PORT;
app.listen(port, console.log("server running on port " + port));
