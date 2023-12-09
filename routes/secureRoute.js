// /backend/routes/secureRoute.js

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const secureController=require("../controllers/secureController")

const router = express.Router();

// Example of a route that requires authentication
router.get('/protected', secureController, (req, res) => {
  res.json({ message: 'Access granted to protected route' });
});

module.exports = router;