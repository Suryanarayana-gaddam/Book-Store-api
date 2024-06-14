const express = require('express');
const router = express.Router();

const { getBookById, getAllBooks, getBooksByCreaterId, getBooksByCategory, uploadABook, updateBook, deleteBook, getSearchedBooks, getBestSeellerBooks, getAllBooksCount, getOtherBooks, getBestSellerBooks} = require("../controllers/bookControllers")
const verifyToken = require("../middleware/verifyToken");

router.get('/book/:id', verifyToken, getBookById);
router.get('/all-books',verifyToken, getAllBooks);
router.get('/all-books-count', getAllBooksCount);
router.get('/all-books/bestSellerBooks',  getBestSellerBooks);
router.get('/all-books/other-books', getOtherBooks);
router.get('/user/:createrId/get/books', verifyToken, getBooksByCreaterId);
router.get('/all-books/bycategory', verifyToken, getBooksByCategory);
router.get('/all-books/searchedbooks', verifyToken, getSearchedBooks);
router.post('/upload-book', verifyToken, uploadABook);
router.patch('/book/update/:id', verifyToken,updateBook);
router.delete('/book/delete/:id', verifyToken,deleteBook);


module.exports= router;