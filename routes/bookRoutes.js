const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Get all books");
});

router.post("/add", (req, res) => {
    res.send("Book added");
});

router.delete("/delete", (req, res) => {
    res.send("Book deleted");
});

module.exports = router;