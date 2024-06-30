const express = require('express')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config(); // This line loads the .env file into process.env
var jwt = require('jsonwebtoken');
//const crypto = require('crypto');

const serverless = require('serverless-http');

const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs');


//middleware
// app.use(cors());

const corsOptions = {
  origin: ['https://book-store-frontend-henna.vercel.app', 'https://book-store-api-theta.vercel.app/']// Allow only this origin
};

app.use(cors(corsOptions));

app.use(express.json());

//mongoose configaration using mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qa7kwkd.mongodb.net/BookInventory?retryWrites=true&w=majority&appName=Cluster0`)
.then(
  console.log(" Mongo DB connected successfully !")
)
.catch((error) => console.log("Error connecting to the Mongo DB !",error));

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

  app.use('/user',userRoutes);
  app.use('/',userRoutes);



app.use('/user',orderRoutes);
app.use('/',orderRoutes);

app.get('/',  (req, res) => {
  res.send('Hello World!')
})




app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

// Export the app for serverless function
module.exports = app;
module.exports.handler = serverless(app);




