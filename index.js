const express = require("express");

const app = express();

const bookRoutes = require("./routes/bookRoutes");

app.use("/books", bookRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});