var jwt = require('jsonwebtoken');

// token middleware 
// verify token 

const verifyToken = (req,res,next) => {
    //console.log(req.headers.authorization);
    if(!req.headers.authorization){
      return res.status(401).send({ message : "Unauthorised access!" });
    }
  
    const token = req.headers.authorization.split(' ')[1];
    //console.log(token);
    jwt.verify(token,process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
      if(err){
        return res.status(401).send({message:"Invalid token !"});
      }
      req.decoded = decoded;
      next();
    })
  }

  module.exports = verifyToken;