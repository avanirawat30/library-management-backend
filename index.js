const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const issueRoutes = require("./routes/issueRoutes");
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/issues", issueRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  })
  .catch((err) => {
    console.log(err);
  });