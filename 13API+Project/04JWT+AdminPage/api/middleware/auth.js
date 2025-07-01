const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
      const token = bearerHeader.split(' ')[1]; 

      const user = jwt.verify(token, process.env.JWT_SECRET); 

      req.token = user;   
      next();
    } else {
      res.status(403).json({ message: 'No token provided, access denied' });
    }

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = auth;


