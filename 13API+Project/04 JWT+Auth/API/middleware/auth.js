const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
      const token = bearerHeader.split(' ')[1]; 

      const user = jwt.verify(token, process.env.JWT_SECRET); 

      req.token = user;     //add the user token to the request object
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



















// const auth = async (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.token=decoded //add the decoded token to the request object
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };

// module.exports = auth;
