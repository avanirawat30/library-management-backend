const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/users", userRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });