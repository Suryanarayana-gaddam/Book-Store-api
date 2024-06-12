const { ObjectId } = require("mongodb");
const books = require("../models/books");

const getBookById =   async(req,res) =>{
  try{
    const id = req.params.id;
    const filter = { _id:new ObjectId(id)};
    const result = await books.findOne(filter).exec();
    res.send(result);
  } catch(error){
      res.status(500).json({message : error.message});
  }
}

const getSearchedBooks = async (req, res) => {
  const query = req.query.query;

  try {
    // Fetch all books from the database
    const bookss = await books.find({});

    if (!query) {
      // If no search query is provided, return all books
      return res.status(200).json(bookss);
    }

    // Filter books based on the search query
    const filteredBooks = bookss.filter(book => {
      if (book && book.bookTitle && book.category) {
        const titleMatch = book.bookTitle.toLowerCase().includes(query.toLowerCase());
    
        // Check if the category matches exactly with the query
        const categoryMatch = book.category.toLowerCase() === query.toLowerCase();
    
        // Return true if either the title or the category matches
        return titleMatch || categoryMatch;
      } else if (book && book.category) {
        // If there is no book title but there is a category,
        // check if the category matches exactly with the query
        return book.category.toLowerCase() === query.toLowerCase();
      } else {
        return false; // Filter out undefined or incomplete book objects
      }
    });

    // Return the filtered books
    res.status(200).json(filteredBooks);
  } catch (error) {
    // If an error occurs, return a 500 status code with the error message
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const getAllBooks = async(req,res) => {
    try{
        const bookss = await books.find({});
        res.status(200).json(bookss);
    } catch(error){
        res.status(500).json({message : error.message});
    }
}
const getAllBooksCount = async(req,res) => {
    try{
        const bookss = await books.find({});
        const booksCount = bookss.length;
        res.status(200).json({booksCount:booksCount});
    } catch(error){
        res.status(500).json({message : error.message});
    }
}
const getBestSeellerBooks = async(req,res) => {
    try{
        const bookss = await books.find({});
        const BestSellerBooks = bookss.slice(45,57)
        res.status(200).json(BestSellerBooks);
    } catch(error){
        res.status(500).json({message : error.message});
    }
}

const uploadABook = async(req,res) => {
    try{
      const data = req.body;
      const result = await books.create(data);
      res.send(result);
    } catch (error) {
      // If an error occurs, return a 500 status code with the error message
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  const updateBook = async(req,res) => {
    try{
        const id = req.params.id;
        //console.log(id);
        const updateBookData = req.body;
        const filter = {_id: new ObjectId(id)};
        const options = {upsert: true};
        const updateDoc = {
            $set:{
            ...updateBookData
            }
        }
        //update
        const result = await books.updateOne(filter,updateDoc,options);
        res.send(result);
    } catch (error) {
        // If an error occurs, return a 500 status code with the error message
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
  }

  const deleteBook = async(req,res) => {
    try{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await books.deleteOne(filter);
      res.send(result);
    } catch (error) {
        // If an error occurs, return a 500 status code with the error message
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
  }

  const getBooksByCreaterId = async (req, res) => {
    const createrId = req.params.createrId;
  
    try {
        // Find the books by createrId in the bookcollections
        const bookss = await books.find({ "createrId": createrId });
  
        if (!bookss || bookss.length === 0) {
            // If no books are found, return a 404 status code
            return res.status(404).json({ error: "Books not found" });
        }
        // If the books are found, return the book data
        res.status(200).json(bookss);
    } catch (error) {
        // If an error occurs, return a 500 status code with the error message
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
  }

  const getBooksByCategory  = async(req,res) => {
    try{
      let query = {};
      if(req.query?.category){
        query = {category: req.query.category}
      } 
      const result = await books.find(query);
      
      res.send(result);
      } catch (error) {
        // If an error occurs, return a 500 status code with the error message
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
  }


module.exports= { getBookById, getSearchedBooks, getAllBooks, getAllBooksCount, getBestSeellerBooks, getBooksByCreaterId, uploadABook , updateBook , deleteBook , getBooksByCategory}

