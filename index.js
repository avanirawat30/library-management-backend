const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Library API running");
});

app.get("/about", (req, res) => {
    res.send("Welcome to Library Management System");
});

app.get("/books", (req, res) => {
    res.send("Books route working");
});

app.get("/students", (req, res) =>{
    res.send("Students route working");

})
app.listen(5000, () => {
    console.log("Server running on port 5000");
});