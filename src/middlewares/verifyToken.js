const verifyToken = (req, res, next) => {
    try {
      const authorizationHeader = req.get("Authorization");
  
      if (authorizationHeader == null) {
        throw new Error("Authorization header is missing");
      }
  
      const [type, token] = authorizationHeader.split(" ");
  
      if (type !== "Bearer") {
        throw new Error("Authorization header has not the 'Bearer' type");
      }
  
      req.payload = jwt.verify(token, process.env.JWT_SECRET);
  
      next();
    } catch (err) {
      console.error(err);
      res.sendStatus(401);
    }
  };
  
  module.exports = {
    verifyToken, 
  };