const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  bookId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  createrId: {
    type: String
    },
  bookTitle: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  bookDescription: {
    type: String,
    required: true
  },
  bookPDFURL: {
    type: String,
    required: true
  },
  bookPrice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
},
{
  timestamps: true
}
);

const orders = mongoose.model('Order', orderSchema);

module.exports = orders;
