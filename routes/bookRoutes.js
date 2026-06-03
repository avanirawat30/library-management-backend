const express = require("express");

const router = express.Router();
let books = [];

router.get("/", (req, res) => {
    res.json(books);
});
router.post("/add", (req, res) => {
    const newBook = req.body;

    if (!newBook.title || !newBook.author) {
        return res.status(400).json({
            message: "Title and author are required"
        });
    }

    books.push(newBook);

    res.json({
        message: "Book added successfully",
        book: newBook
    });
});

router.delete("/delete", (req, res) => {
    res.send("Book deleted");
});

module.exports = router;