// routers/bookRouter.js

const express = require("express");
const multer = require("multer");
const { storage } = require("../middleware/storage");
const { checkToken } = require("../middleware/checkToken");
const {
  postRating,
  getBooks,
  getBooksWithBestRating,
  getBook,
  deleteBook,
  postBooks,
  putBook,
} = require("../controllers/bookController");

const bookRouter = express.Router();

bookRouter.post("/:id/rating", checkToken, postRating);
bookRouter.get("/", getBooks);
bookRouter.get("/bestrating", getBooksWithBestRating);
bookRouter.get("/:id", getBook);
bookRouter.delete("/:id", checkToken, deleteBook);
bookRouter.post(
  "/",
  checkToken,
  multer({ storage: storage }).single("image"),
  postBooks
);
bookRouter.put("/:id", checkToken, putBook);

module.exports = { bookRouter };
