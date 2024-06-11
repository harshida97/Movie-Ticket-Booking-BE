import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateAdmin(req, res, next) {
  
  const authHeader = req.headers.authorization

  
    if(!authHeader===undefined){
    return res.status(401).send("Access Denied: No Token Provided!");
  }
  
  const token = authHeader.split(" ")[1]

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Invalid Token");
    }
    else{
    next();
  }});
}

export default authenticateAdmin;