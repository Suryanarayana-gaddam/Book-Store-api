const express = require('express');
const router = express.Router();

const { signUp , getUserByEmail, getUserById, getCartBooks,addToCart, addToWishlist, removeFromWishlist, removeBookFromCart, getBooksInWishlist, checkUserAtLogin, removeAllFromCart, getUsers, deleteUser, updateUser, getUsersCount } = require("../controllers/userControllers");

const verifyToken = require("../middleware/verifyToken");

router.get('/userByEmail/:email', getUserByEmail);
router.get('/:id', verifyToken, getUserById);
router.get('/admin/all-users',verifyToken, getUsers);
router.get('/admin/all-users-count', getUsersCount);
router.get('/:userId/get/cart', verifyToken,getCartBooks);
router.get('/:userId/get/wishlist', verifyToken,getBooksInWishlist);
router.delete('/delete/:id', verifyToken,deleteUser);
router.post('/:userId/wishlist/add', verifyToken,addToWishlist);
router.post('/:userId/wishlist/remove/:bookId', verifyToken,removeFromWishlist);
router.post('/:userId/cart/remove/:bookId', verifyToken,removeBookFromCart);
router.post('/:userId/cart/removeAll', verifyToken,removeAllFromCart);
router.post('/:userId/cart/add', verifyToken,addToCart);
router.post('/sign-up', signUp);
router.post('/login',checkUserAtLogin);
router.patch("/user/:id",verifyToken,updateUser);



module.exports= router;
