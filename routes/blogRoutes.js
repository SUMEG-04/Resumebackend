// /routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const multerConfig = require('../config/multerConfig');

// Route to get all blog posts
router.get('/posts', blogController.getAllBlogPosts); // Change this line

// Route to get a specific blog post by ID
router.get('/posts/:id', blogController.getBlogPostById); // Change this line

// Route to add a new blog post
router.post('/posts',multerConfig.array('images',5), blogController.addBlogPost); // Change this line

// Add more routes as needed for blog functionalities
router.delete('/posts/:id', blogController.deleteBlogPostById);


module.exports = router;
