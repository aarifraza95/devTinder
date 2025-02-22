const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(express.json()); //middleware
app.use(cookieParser());

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);

connectDB()
  .then(() => {
    console.log("connected to db");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("error connectiong to db");
  });
