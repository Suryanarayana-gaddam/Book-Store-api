const express = require('express')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config(); // This line loads the .env file into process.env
var jwt = require('jsonwebtoken');
//const crypto = require('crypto');


const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');


//middleware
app.use(cors());
app.use(express.json());

//mongoose configaration using mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qa7kwkd.mongodb.net/BookInventory?retryWrites=true&w=majority&appName=Cluster0`)
.then(
  console.log(" Mongo DB connected successfully !")
)
.catch((error) => console.log("Error connecting to the Mongo DB !",error));

// // jwt key
// app.post('/jwt', async (req,res) => {
//   const user = req.body;
//   const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN , {
//     expiresIn : '1hr'
//   })
//   res.send({token});
// })
app.post('/jwt', async (req, res) => {
  try {
    // Get user data from the request body
    const user = req.body;

    // Generate JWT using user data and secret token
    const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
      expiresIn: '1hr'
    });

    // Send the token in the response
    res.send({ token });
  } catch (error) {
    // Handle any errors that occur during token generation
    console.error('Error generating JWT:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});


// import routes here 
const bookRoutes = require('./api/routes/bookRoutes');
const userRoutes = require('./api/routes/userRoutes');
const orderRoutes = require('./api/routes/orderRoutes');

app.use('/',bookRoutes);
// app.use('/upload-book',bookRoutes);
// app.use('/book',bookRoutes);
// app.use('/user',bookRoutes);
// app.use('/all-books/bycategory',bookRoutes);
// app.use('/all-books/searchedbooks',bookRoutes);

//app.use('/userByEmail',userRoutes);
  app.use('/user',userRoutes);
  app.use('/',userRoutes);
// app.use('/book',userRoutes);
 //app.use('/sign-up',userRoutes);
// app.use('/login',userRoutes);


app.use('/user',orderRoutes);
app.use('/',orderRoutes);

app.get('/',  (req, res) => {
  res.send('Hello World!')
})




app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})



//mongodb configaration
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qa7kwkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1, 
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     //create a collection of documents
//     const bookcollections = client.db("BookInventory").collection("books");
//     const usersdata = client.db("BookInventory").collection("users");
//     const orders = client.db("BookInventory").collection("orders");

//     //insert a book to the database post method
//     app.post("/upload-book",async(req,res) => {
//       try{
//         const data = req.body;
//         const result = await bookcollections.insertOne(data);
//         res.send(result);
//       } catch (error) {
//         // If an error occurs, return a 500 status code with the error message
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//       }
//     });

//     //insert a book order to the database post method
//     app.post("/user/:userId/add/orders",async(req,res) => {
//       try{
//         const data = req.body;
//         const result = await orders.insertOne(data);
//         res.send(result);
//       } catch (error) {
//         // If an error occurs, return a 500 status code with the error message
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//       }
//     });

//      // Define a GET method to retrieve user data by email
//   app.get("/user/:userId/get/orders", async (req, res) => {
//     const userId = req.params.userId;

//     try {
//       // Find the user by email in the userdata collection
//       const order = await orders.find({ userId }).toArray();

//       if (!order) {
//         // If the user is not found, return a 404 status code
//         return res.status(404).json({ error: "Orders not found" });
//       }

//       // If the user is found, return the user data
//       res.status(200).json(order);
//     } catch (error) {
//       // If an error occurs, return a 500 status code with the error message
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });
    
//     //get all books from the database
//     app.get("/all-books",async(req,res) => {
//         const books = await bookcollections.find();
//         const result = await books.toArray();
//         res.send(result);
//     })

//     //update a book data : patch or update methods
//     app.patch("/book/:id", async(req,res) => {
//       const id = req.params.id;
//       //console.log(id);
//       const updateBookData = req.body;
//       const filter = {_id: new ObjectId(id)};
//       const options = {upsert: true};
//       const updateDoc = {
//           $set:{
//             ...updateBookData
//           }
//       }
//       //update
//       const result = await bookcollections.updateOne(filter,updateDoc,options);
//       res.send(result);
//     })

//     //delete a book data 
//     app.delete("/book/:id", async(req,res) => {
//       const id = req.params.id;
//       const filter = {_id: new ObjectId(id)};
//       const result = await bookcollections.deleteOne(filter);
//       res.send(result);
//     })

    
//     //find by category
//     app.get("/all-books/bycategory",async(req,res) => {
//       let query = {};
//       if(req.query?.category){
//         query = {category: req.query.category}
//       } 
//       const result = await bookcollections.find(query).toArray();
//       res.send(result);
//     })                      


//     //to get single book data
//     app.get("/book/:id", async(req,res) =>{
//       const id = req.params.id;
//       const filter = { _id:new ObjectId(id)};
//       const result = await bookcollections.findOne(filter);
//       res.send(result);
//     })


//     // Define a GET method to fetch filtered books based on a search query
// app.get("/all-books/searchedbooks", async (req, res) => {
//   const query = req.query.query;

//   try {
//     // Fetch all books from the database
//     const books = await bookcollections.find().toArray();

//     if (!query) {
//       // If no search query is provided, return all books
//       return res.status(200).json(books);
//     }

//     // Filter books based on the search query
//     const filteredBooks = books.filter(book => {
//       if (book && book.bookTitle && book.category) {
//         return (
//           book.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
//           book.category.toLowerCase().includes(query.toLowerCase())
//         );
//       } else if (book && book.category) {
//         return book.category.toLowerCase().includes(query.toLowerCase());
//       } else {
//         return false; // Filter out undefined or incomplete book objects
//       }
//     });

//     // Return the filtered books
//     res.status(200).json(filteredBooks);
//   } catch (error) {
//     // If an error occurs, return a 500 status code with the error message
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });



//     //insert user data in the database after sign-up
//     app.post("/sign-up",async(req,res) => {
//       const {email,password,username} = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const result = await usersdata.insertOne({email,hashedPassword,username,wishlist: [],
//         cart: [],
//         orders: [],
//         uploadedbooks: []});
//       res.send(result);
//     })

//     //insert user data in the database after login using google account
//     app.post("/login",async(req,res) => {
//       const {email,password,username} = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const result = await usersdata.insertOne({email,hashedPassword,username,wishlist: [],
//         cart: [],
//         orders: [],
//         uploadedbooks: []});
//       res.send(result);
//     })

//     // get the user details from the database
//       app.get("/user/:id", async (req, res) => {
//         const id = req.params.id;
//         const filt = {_id:new ObjectId(id)};
//         const result = await usersdata.findOne(filt);
//         res.send(result);

//       })


//       // get the user data by email
//   //     // Define a GET method to retrieve user data by email
//   // app.get("/userByEmail/:email", async (req, res) => {
//   //   const email = req.params.email;

//   //   try {
//   //     // Find the user by email in the userdata collection
//   //     const user = await usersdata.findOne({ email });

//   //     if (!user) {
//   //       // If the user is not found, return a 404 status code
//   //       return res.status(404).json({ error: "User not found" });
//   //     }

//   //     // If the user is found, return the user data
//   //     res.status(200).json(user);
//   //   } catch (error) {
//   //     // If an error occurs, return a 500 status code with the error message
//   //     console.error(error);
//   //     res.status(500).json({ error: "Internal server error" });
//   //   }
//   // });

//        // Define a GET method to retrieve user data by email
//   app.get("/userByEmail/:email", async (req, res) => {
//     const email = req.params.email;

//     try {
//       // Find the user by email in the userdata collection
//       const user = await usersdata.findOne({ email });

//       if (!user) {
//         // If the user is not found, return a 404 status code
//         return res.status(404).json({ error: "User not found" });
//       }

//       // If the user is found, return the user data
//       res.status(200).json(user);
//     } catch (error) {
//       // If an error occurs, return a 500 status code with the error message
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });
//   // // Define a GET method to retrieve books by createrId
//   //    app.get("/user/:createrId/get/books", async (req, res) => {
//   //     const createrId = req.params.createrId;
  
//   //     try {
//   //       // Find the book by createrId in the  bookcollections
//   //       const books = await bookcollections.find({ createrId });

//   //       if (!books || books.length === 0) {
//   //           // If no books are found, return a 404 status code
//   //           return res.status(404).json({ error: "Books not found" });
//   //       }
//   //       // If the Book is found, return the book data
//   //       res.status(200).json(books);
//   //     } catch (error) {
//   //       // If an error occurs, return a 500 status code with the error message
//   //       console.error(error);
//   //       res.status(500).json({ error: "Internal server error" });
//   //     }
//   //   });

//   // Define a GET method to retrieve books by createrId
// app.get("/user/:createrId/get/books", async (req, res) => {
//   const createrId = req.params.createrId;

//   try {
//       // Find the books by createrId in the bookcollections
//       const books = await bookcollections.find({ "createrId": createrId }).toArray();

//       if (!books || books.length === 0) {
//           // If no books are found, return a 404 status code
//           return res.status(404).json({ error: "Books not found" });
//       }
//       // If the books are found, return the book data
//       res.status(200).json(books);
//   } catch (error) {
//       // If an error occurs, return a 500 status code with the error message
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//   }
// });


// // ADD book to user wishlist
// app.post('/user/:userId/wishlist/add', async (req, res) => {
//   const userId = req.params.userId;
//   const  book = req.body;
//   console.log('User Id :' ,userId);
// console.log("Recieved book :",book);  
//   try {
//     // Find the user by userId and update the wishlist array
//     const updatedUser = await usersdata.findOneAndUpdate(
//       { _id :new ObjectId(userId) },
//       { $addToSet: { wishlist: book} }, // Push the entire book object
//       {new : true}
//     );

//     res.status(200).json(updatedUser);
//     console.log('Updated user:', updatedUser); // Log the updated user object

//   } catch (error) {
//     console.error("Error adding item to wishlist:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// // ADD book to user cart
// app.post('/user/:userId/cart/add', async (req, res) => {
//   const userId = req.params.userId;
//   const  book = req.body;
//   console.log('User Id :' ,userId);
// console.log("Recieved book :",book);  
//   try {
//     // Find the user by userId and update the cart array
//     const updatedUser = await usersdata.findOneAndUpdate(
//       { _id :new ObjectId(userId) },
//       { $addToSet: { cart: book} }, // Push the entire book object
//       {new : true}
//     );

//     res.status(200).json(updatedUser);
//     console.log('Updated user:', updatedUser); // Log the updated user object

//   } catch (error) {
//     console.error("Error adding item to cart:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // REMOVE book from user wishlist
// app.post('/user/:userId/wishlist/remove/:bookId', async (req, res) => {
//   const userId = req.params.userId;
//   const bookId = req.body.bookId;

//   console.log('User Id:', userId);
//   console.log('Book Id:', bookId);

//   try {
//     // Find the user by userId and update the wishlist array
//     const updatedUser = await usersdata.findOneAndUpdate(
//       { _id: new ObjectId(userId) },
//       { $pull: { wishlist: { _id : bookId } } }, // Pull book with matching ID
//       {new : true}
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(updatedUser);
//     console.log('Updated user:', updatedUser);

//   } catch (error) {
//     console.error("Error removing book from wishlist:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
//   });


//   // REMOVE book from user cart
// app.post('/user/:userId/cart/remove/:bookId', async (req, res) => {
//   const userId = req.params.userId;
//   const bookId = req.body.bookId;

//   console.log('User Id:', userId);
//   console.log('Book Id:', bookId);

//   try {
//     // Find the user by userId and update the wishlist array
//     const updatedUser = await usersdata.findOneAndUpdate(
//       { _id: new ObjectId(userId) },
//       { $pull: { cart: { _id : bookId } } }, // Pull book with matching ID
//       {new : true}
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(updatedUser);
//     console.log('Updated user:', updatedUser);

//   } catch (error) {
//     console.error("Error removing book from cart:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
//   });

//   // REMOVE all books from user cart
// app.post('/user/:userId/cart/removeAll', async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     // Find the user by userId and update the wishlist array to an empty array
//     const updatedUser = await usersdata.findOneAndUpdate(
//       { _id: new ObjectId(userId) },
//       { $set: { cart: [] } }, // Set cart array to empty
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(updatedUser);
//     console.log('Updated user:', updatedUser);

//   } catch (error) {
//     console.error("Error removing all books from cart:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });




// // Get the books in the wishlist by uesrid
// app.get('/user/:userId/get/wishlist', async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     // Find the user by user ID
//     const user = await usersdata.findOne({_id:new ObjectId(userId)});

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Extract wishlist from the user object
//     const reswishlist = user.wishlist;

//     res.status(200).json( reswishlist );
//     //console.log({reswishlist});
//   } catch (error) {
//     console.error('Error retrieving wishlist:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // Get the books in the cart by uesrid
// app.get('/user/:userId/get/cart', async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     // Find the user by user ID
//     const user = await usersdata.findOne({_id:new ObjectId(userId)});

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Extract cart from the user object
//     const rescart = user.cart;

//     res.status(200).json( rescart );
//     //console.log({rescart});
//   } catch (error) {
//     console.error('Error retrieving cart:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });





//   app.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email in the userdata collection
//         const user = await usersdata.findOne({ email });

//         // If the user is not found, return a 404 status code
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Compare the provided password with the hashed password stored in the database
//         const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

//         // If the passwords match, return the user data
//         if (passwordMatch) {
//             res.status(200).json(user);
//         } else {
//             // If the passwords do not match, return a 401 status code
//             res.status(401).json({ error: "Incorrect password" });
//         }
//     } catch (error) {
//         // If an error occurs, return a 500 status code with the error message
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
//   });




//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     //await client.close();
//   }
// }
// run().catch(console.dir);


// app.listen(port, () => {
//   console.log(`App listening on port ${port}`)
// })

















// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const User = require('./User'); // Import the User model

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB configuration
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri =
//   'mongodb+srv://mern-book-store:8JGA3AS1A1hApx3E@cluster0.qa7kwkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();
//     const bookcollections = client.db('BookInventory').collection('books');
//     const users = client.db('BookInventory').collection('users');

//     app.post('/upload-book', async (req, res) => {
//       const data = req.body;
//       const result = await bookcollections.insertOne(data);
//       res.send(result);
//     });

//     app.patch('/book/:id', async (req, res) => {
//       const id = req.params.id;
//       const updateBookData = req.body;
//       const filter = { _id: new ObjectId(id) };
//       const options = { upsert: true };
//       const updateDoc = {
//         $set: {
//           ...updateBookData,
//         },
//       };
//       const result = await bookcollections.updateOne(filter, updateDoc, options);
//       res.send(result);
//     });

//     app.delete('/book/:id', async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const result = await bookcollections.deleteOne(filter);
//       res.send(result);
//     });

//     app.get('/all-books', async (req, res) => {
//       let query = {};
//       if (req.query?.category) {
//         query = { category: req.query.category };
//       }
//       const result = await bookcollections.find(query).toArray();
//       res.send(result);
//     });

//     app.get('/book/:id', async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const result = await bookcollections.findOne(filter);
//       res.send(result);
//     });

//     // User management routes

//     app.post('/signup', async (req, res) => {
//       const { username, email, password } = req.body;
      
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const data = req.body;
//       const result = await users.insertOne(data);
//       res.send(result);
//     });

//     app.post('/login', async (req, res) => {
//       const { email, password } = req.body;
//       const result = await users.insertOne(data);
//       res.send(result);
//       try {
//         const user = await User.findOne({ email });
//         if (!user) {
//           return res.status(404).send('User not found');
//         }
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//           return res.status(401).send('Invalid password');
//         }
//         res.status(200).send('Login successful');
//       } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal server error');
//       }
//     });

//     await client.db('admin').command({ ping: 1 });
//     console.log('Pinged your deployment. You successfully connected to MongoDB!');
//   } finally {
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });
