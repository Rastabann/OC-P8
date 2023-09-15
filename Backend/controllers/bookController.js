// controllers/bookController.js

const { Book } = require("../models/Book");
const path = require("path");
const sharp = require("sharp");

async function postRating(req, res) {
  const id = req.params.id;
  const book = await Book.findById(id);
  const userId = req.body.userIdFromToken;
  try {
    const ratings = book.ratings;
    if (ratings.some((obj) => obj.userId === userId)) {
      return res.status(400).send("You have already rated this book");
    }
    const newRating = {
      userId: userId,
      grade: req.body.rating,
    };
    ratings.push(newRating);

    const sum = ratings.reduce((total, curr) => (total += curr.grade), 0);
    const numberOfRaters = ratings.length;
    const averageRating = sum / numberOfRaters;
    book.ratings = ratings;
    book.averageRating = averageRating;

    book.save();
    res.send(book);
  } catch (error) {
    console.error(error);
  }
}

async function getBooksWithBestRating(req, res) {
  const books = await Book.find().sort({ averageRating: -1 }).limit(3);
  res.send(books);
}

async function putBook(req, res) {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (!book) return res.status(404).send("Book not found");
  const userId = book.userId;
  if (userId !== req.body.userIdFromToken)
    return res.status(401).send("You can only update your own books");
  const result = await Book.findOneAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      genre: req.body.genre,
    }
  );
  res.send(result);
}

async function deleteBook(req, res) {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (!book) return res.status(404).send("Book not found");
  const userIdOnBook = book.userId;
  if (userIdOnBook !== req.body.userIdFromToken)
    return res.status(401).send("You can only delete your own books");
  const result = await Book.findByIdAndDelete(id);
  res.send(result);
}

async function getBook(req, res) {
  const id = req.params.id;
  const book = await Book.findById(id);
  book.imageUrl = generateImageUrl(book.imageUrl);
  res.send(book);
}

async function postBooks(req, res) {
  const bookStringified = req.body.book;
  const book = JSON.parse(bookStringified);
  const file = req.file;

  try {
    const initialRating = book.ratings.find(
      (rating) => rating.userId === book.userId
    ).grade;

    // Utilisation de sharp pour redimensionner l'image et la convertir en WebP
    const outputFilename = Date.now() + "-resized.webp";
    const outputPath = path.join("uploads", outputFilename);

    await sharp(file.path)
      .resize(130, 200) // Redimensionner à 130px x 200px
      .webp() // Convertir en WebP
      .toFile(outputPath);

    const newBook = new Book({
      userId: book.userId,
      title: book.title,
      author: book.author,
      imageUrl: outputFilename,
      year: book.year,
      genre: book.genre,
      ratings: [
        {
          userId: book.userId,
          grade: initialRating,
        },
      ],
      averageRating: initialRating, // Réglage de la note moyenne initiale pour être la note initiale
    });
    await newBook.save();
    res.send(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error posting the book." });
  }
}

async function getBooks(req, res) {
  const allBooks = await Book.find();
  allBooks.forEach((book) => {
    const imageUrl = generateImageUrl(book.imageUrl);
    book.imageUrl = imageUrl;
  });
  res.send(allBooks);
}

function generateImageUrl(localUrl) {
  const hostUrl = process.env.HOST_URL;
  const port = process.env.PORT;
  const absoluteUrl = hostUrl + ":" + port + "/" + localUrl;
  return absoluteUrl;
}

module.exports = {
  postRating,
  getBooks,
  getBooksWithBestRating,
  getBook,
  deleteBook,
  postBooks,
  putBook,
};
