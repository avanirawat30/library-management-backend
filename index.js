const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const bookRoutes = require("./routes/bookRoutes");

app.use(express.json());

app.use("/books", bookRoutes);

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