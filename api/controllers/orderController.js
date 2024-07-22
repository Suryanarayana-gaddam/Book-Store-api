const orders = require("../models/orders");

const uploadOrder = async(req,res) => {
    try{
      const data = req.body;
      //console.log(data)
      const result = await orders.create(data);
      res.send(result);
     
    } catch (error) {
      // If an error occurs, return a 500 status code with the error message
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  const getOrderById = async (req, res) => {
    const userId = req.params.userId;
    
    try {
      // Find the user by email in the userdata collection
      const order = await orders.find({ 'userId' : userId });

      if (!order) {
        // If the user is not found, return a 404 status code
        return res.status(404).json({ error: "Orders not found" });
      }

      // If the user is found, return the user data
      res.status(200).json(order);
    } catch (error) {
      // If an error occurs, return a 500 status code with the error message
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  const getAllOrders = async(req,res) => {
    try{
        const ord = await orders.find({});
        res.status(200).json(ord);
    } catch(error){
        res.status(500).json({message : error.message});
    }
}
  const getAllOrdersCount = async(req,res) => {
    try{
        const ord = await orders.find({});
        const ordersCount = ord.length;
        res.status(200).json({count : ordersCount});
    } catch(error){
        res.status(500).json({message : error.message});
    }
}

  module.exports = { uploadOrder, getOrderById , getAllOrders,getAllOrdersCount}