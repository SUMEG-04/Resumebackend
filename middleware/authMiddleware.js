// /backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Assuming you have a Admin model

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log('Incoming request:', req.method, req.originalUrl);
    // console.log('Token:', token);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Error verifying token:', error.message);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    const rootAdmin = await Admin.findOne({ _id: verifyToken._id });
    if (!rootAdmin) {
      throw new Error('Admin not found');
    }

    req.token = token;
    req.rootAdmin = rootAdmin;
    req.AdminID = rootAdmin._id;
    next();
  } catch (err) {
    console.error('Error in authMiddleware:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


module.exports = authMiddleware;
