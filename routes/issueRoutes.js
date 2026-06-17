const express = require("express");

const router = express.Router();

const Issue = require("../models/Issue");
const Book = require("../models/Book");

const authMiddleware = require("../middleware/authMiddleware");
router.post(
  "/issue/:bookId",
  authMiddleware,
  async (req, res) => {
    try {
      const book = await Book.findById(
        req.params.bookId
      );

      if (!book) {
        return res.status(404).json({
          message: "Book not found"
        });
      }

      if (!book.available) {
        return res.status(400).json({
          message: "Book already issued"
        });
      }

     const issueDate = new Date();

const dueDate = new Date();
dueDate.setDate(issueDate.getDate() + 7);

const issue = await Issue.create({
  user: req.user.id,
  book: req.params.bookId,
  issueDate,
  dueDate
});

      book.available = false;

      await book.save();

      res.json({
        message: "Book issued successfully",
        issue
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);
router.post(
  "/return/:bookId",
  authMiddleware,
  async (req, res) => {
    try {
      const issue = await Issue.findOne({
        user: req.user.id,
        book: req.params.bookId
      });

      if (!issue) {
        return res.status(404).json({
          message: "Issue record not found"
        });
      }

      await Issue.findByIdAndDelete(
        issue._id
      );

      const book = await Book.findById(
        req.params.bookId
      );

      book.available = true;

      await book.save();

      res.json({
        message: "Book returned successfully"
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);
router.get(
  "/my-books",
  authMiddleware,
  async (req, res) => {
    try {
      const issues = await Issue.find({
        user: req.user.id
      }).populate("book");

      res.json(issues);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);
router.get(
  "/all-issued",
  authMiddleware,
  async (req, res) => {
    try {
      const issues = await Issue.find()
        .populate("book")
        .populate("user", "name email");

      res.json(issues);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);
module.exports = router;