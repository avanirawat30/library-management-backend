const express = require("express");

const router = express.Router();
let books = [];
let currentId = 1;

router.get("/", (req, res) => {
    res.json(books);
});
router.post("/add", (req, res) => {
    const newBook = {
    id: currentId++,
    title: req.body.title,
    author: req.body.author
};

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

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    books = books.filter(book => book.id !== id);

    res.json({
        message: "Book deleted successfully"
    });

});

module.exports = router;