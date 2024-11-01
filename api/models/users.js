const mongoose = require('mongoose');
const {Schema}= mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  profilePic: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  userDetails: [{
    type: Object,
  }],
  googleSignIn: {
    type: String,
  },
  wishlist: [{
    _id: mongoose.Schema.Types.ObjectId,
    bookTitle: String,
    authorName: String,
    imageURL: String,
    category: String,
    bookDescription: String,
    bookPDFURL: String,
    bookPrice: Number
  }],
  cart: [{
    _id: mongoose.Schema.Types.ObjectId,
    bookTitle: String,
    authorName: String,
    imageURL: String,
    category: String,
    bookDescription: String,
    bookPDFURL: String,
    bookPrice: Number
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  uploadedbooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UploadBook'
  }]
});

const users = mongoose.model('User', userSchema);

module.exports = users;
